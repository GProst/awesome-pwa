import minimist from 'minimist'
import glob from 'glob'

import {BROWSERS_OF_OSS, OSS, BROWSERS, WINDOW_SIZES} from '../constants/supported-capabilities'
import {FILTER_PARAMS} from '../constants/filter-params'
import {TEST_STATUS} from '../constants/test-status'
import {getFiltersFromArgs} from './helpers/getFiltersFromArgs'

const args = minimist(process.argv.slice(2).map(arg => arg.replace(/---/g, ' ')))
Object.entries(args).forEach(([key, value]) => {
  args[key] = value.toString()
})

const filter = getFiltersFromArgs(args)
// console.log('filter', filter) // TODO: use logger

const testsToExecute = []

const addTest = ({filename, testParams}) => {
  testsToExecute.push({
    run: require(filename).runTest,
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
          filter[FILTER_PARAMS.WINDOW_SIZES]
            .filter(windowSize => {
              return !(os === OSS.MAC_OSX && browser === BROWSERS.CHROME && windowSize === WINDOW_SIZES._320_X_568) // Chrome on MacOSX has min 400px wide window: TODO: create tests
            })
            .forEach(windowSize => {
              filter[FILTER_PARAMS.TYPES].forEach(type => {
                filter[FILTER_PARAMS.PRIORITIES].forEach(priority => {
                  const testParams = {
                    type,
                    priority,
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
                        const [filename] = glob.sync(`../tests/**/${id}.test.js`, {cwd: __dirname})
                        addTest({filename, testParams})
                      } catch(err) {
                        console.error('Error while reading test file with id', id)
                        throw err
                      }
                    })
                  } else {
                    // run over all tests
                    try {
                      const filenames = glob.sync('../tests/**/*.test.js', {cwd: __dirname})
                      filenames.forEach(filename => {
                        addTest({filename, testParams})
                      })
                    } catch(err) {
                      console.error('Error while reading test files')
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

const testQueue = async function * myGen(testsToExecute) {
  for (let test of testsToExecute) {
    yield await test.run(test.testParams)
      .catch(err => {
        console.error('Test failed.', err)
      })
  }
}

const executeTests = async () => {
  for await (let result of testQueue(testsToExecute)) {
    if (result.status === TEST_STATUS.SUCCESS) {
      // console.log(`Test with ID=${result.testProps.id} SUCCEEDED!`) // TODO: use logger
    }
    if (result.status === TEST_STATUS.FAIL) {
      // console.log(`Test with ID=${result.testProps.id} FAILED!`) // TODO: use logger
    }
    if (result.status !== TEST_STATUS.FILTERED) {
      // console.log('Description:', result.testProps.description) // TODO: use logger
      // console.log('Params:', result.testParams, '\n') // TODO: use logger
    }
  }
}

executeTests()
  .then(() => {
    // console.log('Tests execution finished') // TODO: use logger
  })
  .catch(err => {
    console.error('Tests execution failed', err)
  })
