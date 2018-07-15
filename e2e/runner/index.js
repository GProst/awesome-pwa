import minimist from 'minimist'
import glob from 'glob'

import {BROWSERS_OF_OSS} from '../constants/supported-capabilities'
import {FILTER_PARAMS} from '../constants/filter-params'
import {TEST_STATUS} from '../constants/test-status'
import {getFiltersFromArgs} from './helpers/getFiltersFromArgs'
import {logger} from '../utils/logger'

const args = minimist(process.argv.slice(2).map(arg => arg.replace(/---/g, ' ')))
Object.entries(args).forEach(([key, value]) => {
  args[key] = value.toString()
})

const filter = getFiltersFromArgs(args)
logger.debug('Filter:\n', filter, '\n')

const testsToExecute = []

const addTest = ({filename, testParams}) => {
  const {runTest, testProps} = require(filename)
  testsToExecute.push({
    testProps,
    runTest,
    testParams
  })
}

// Collecting all tests and params to execute
// os -> os-version -> browser -> browser-version -> window-size -> type -> priority -> id (if provided)
Object.entries(filter[FILTER_PARAMS.OSS]).forEach(([os, osVersions]) => {
  const supportedBrowsers = BROWSERS_OF_OSS[os]
  osVersions.forEach(osVersion => {
    Object.entries(filter[FILTER_PARAMS.BROWSERS])
      .filter(([browser, browserVersions]) => supportedBrowsers.includes(browser))
      .forEach(([browser, browserVersions]) => {
        browserVersions.forEach(browserVersion => {
          filter[FILTER_PARAMS.WINDOW_SIZES].forEach(windowSize => {
            filter[FILTER_PARAMS.TYPES].forEach(type => {
              filter[FILTER_PARAMS.PRIORITIES].forEach(priority => {
                const testParams = {
                  capabilities: {
                    os,
                    osVersion,
                    browser,
                    browserVersion,
                    windowSize
                  }
                }
                if (filter[FILTER_PARAMS.IDS]) {
                  // if certain ids provided -> run just these tests
                  filter[FILTER_PARAMS.IDS].forEach(id => {
                    try {
                      const [filename] = glob.sync(`../tests/**/${id}-${priority}-${type}.test.js`, {cwd: __dirname})
                      if (filename) addTest({filename, testParams})
                    } catch(err) {
                      logger.error('Error while reading test file with id', id)
                      throw err
                    }
                  })
                } else {
                  // run over all tests
                  try {
                    const filenames = glob.sync(`../tests/**/*-${priority}-${type}.test.js`, {cwd: __dirname})
                    filenames.forEach(filename => {
                      addTest({filename, testParams})
                    })
                  } catch(err) {
                    logger.error('Error while reading test files')
                    throw err
                  }
                }
              })
            })
          })
        })
      })
  })
})

let calls = 0
const testQueue = async function * myGen(testsToExecute) {
  for (let test of testsToExecute) {
    calls++
    yield await test.runTest(test.testParams)
      .catch(err => {
        logger.error('\nTest failed unexpectedly.\n', err)
        return {
          status: TEST_STATUS.FAIL,
          testProps: test.testProps,
          testParams: test.testParams
        }
      })
  }
}

let totalStatus = {
  succeeded: 0,
  failed: 0
}
const executeTests = async () => {
  for await (let result of testQueue(testsToExecute)) {
    if (result.status === TEST_STATUS.SUCCESS) {
      totalStatus.succeeded++
      logger.debug(`Test with ID=${result.testProps.id} SUCCEEDED!`)
    }
    if (result.status === TEST_STATUS.FAIL) {
      totalStatus.failed++
      logger.error(`Test with ID=${result.testProps.id} FAILED!`)
    }
    if (result.status !== TEST_STATUS.FILTERED) {
      logger.debug('Description:', result.testProps.description)
      logger.debug('Params:', result.testParams, '\n')
    }
  }
}

executeTests()
  .then(() => {
    logger.info('Tests execution finished')
  })
  .catch(err => {
    logger.error('Tests execution failed unexpectedly\n', err)
  })
  .finally(() => {
    logger.info('Succeeded:', totalStatus.succeeded)
    logger.info('Failed:', totalStatus.failed)
    logger.info('Total test filter match checks made:', calls)
  })
