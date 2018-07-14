import minimist from 'minimist'
import glob from 'glob'

import {BROWSERS_OF_OS, OS, BROWSER, WINDOW_SIZE} from '../constants/supported-capabilities'
import {TEST_PARAM} from '../constants/test-params'
import {TEST_STATUS} from '../constants/test-status'
import {getFiltersFromArgs} from './helpers/getFiltersFromArgs'

const args = minimist(process.argv.slice(2).map(arg => arg.replace(/---/g, ' ')))
Object.entries(args).forEach(([key, value]) => {
  args[key] = value.toString()
})

const filter = getFiltersFromArgs(args)
// console.log('filter', filter) // TODO: use logger

const testsToExecute = []

const addTest = ({filename, params}) => {
  testsToExecute.push({
    run: require(filename).runTest,
    params
  })
}

// Collecting all tests and params to execute
// os -> os-version -> browser -> browser-version -> window-size -> type -> priority -> id (if provided)
Object.entries(filter[TEST_PARAM.OS]).forEach(([os, osVersions]) => {
  const supportedBrowsers = BROWSERS_OF_OS[os]
  osVersions.forEach(osVersion => {
    Object.entries(filter[TEST_PARAM.BROWSER])
      .filter(([browser, browserVersions]) => supportedBrowsers.includes(browser))
      .forEach(([browser, browserVersions]) => {
        browserVersions.forEach(browserVersion => {
          filter[TEST_PARAM.WINDOW_SIZE]
            .filter(windowSize => {
              return !(os === OS.MAC_OSX && browser === BROWSER.CHROME && windowSize === WINDOW_SIZE._320_X_568) // Chrome on MacOSX has min 400px wide window: TODO: create tests
            })
            .forEach(windowSize => {
              filter[TEST_PARAM.TYPE].forEach(type => {
                filter[TEST_PARAM.PRIORITY].forEach(priority => {
                  const params = {
                    [TEST_PARAM.OS]: os,
                    [TEST_PARAM.OS_VERSION]: osVersion,
                    [TEST_PARAM.BROWSER]: browser,
                    [TEST_PARAM.BROWSER_VERSION]: browserVersion,
                    [TEST_PARAM.WINDOW_SIZE]: windowSize,
                    [TEST_PARAM.TYPE]: type,
                    [TEST_PARAM.PRIORITY]: priority
                  }
                  if (filter[TEST_PARAM.ID]) {
                    // if certain ids provided -> run just these tests
                    filter[TEST_PARAM.ID].forEach(id => {
                      try {
                        const [filename] = glob.sync(`../tests/**/${id}.test.js`, {cwd: __dirname})
                        addTest({filename, params})
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
                        addTest({filename, params})
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
    yield await test.run(test.params)
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
      // console.log('Params:', result.params, '\n') // TODO: use logger
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
