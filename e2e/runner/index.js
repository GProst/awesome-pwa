import minimist from 'minimist'
import glob from 'glob'

import {BROWSERS_OF_OS} from '../constants/supported-capabilities'
import {TEST_PARAM} from '../constants/test-params'
import {getFiltersFromArgs} from './helpers/getFiltersFromArgs'

const args = minimist(process.argv.slice(2).map(arg => arg.replace(/---/g, ' ')))
Object.entries(args).forEach(([key, value]) => {
  args[key] = value.toString()
})

const filter = getFiltersFromArgs(args)
// console.log('filter', filter) // TODO: use logger

// os -> os-version -> browser -> browser-version -> window-size -> type -> priority -> id (if provided)
Object.entries(filter[TEST_PARAM.OS]).forEach(([os, osVersions]) => {
  const supportedBrowsers = BROWSERS_OF_OS[os]

  osVersions.forEach(osVersion => {
    Object.entries(filter[TEST_PARAM.BROWSER]).forEach(([browser, browserVersions]) => {
      if (!supportedBrowsers.includes(browser)) {
        return
      }
      browserVersions.forEach(browserVersion => {
        filter[TEST_PARAM.WINDOW_SIZE].forEach(windowSize => {
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
                // TODO: invoke tests in parallel
                // if certain ids provided -> run just these tests
                filter[TEST_PARAM.ID].forEach(id => {
                  glob(`../tests/**/${id}.test.js`, (err, [filename]) => {
                    if (err) {
                      console.error('Error while reading test file')
                      throw err
                    }
                    require(filename).runTest(params)
                  })
                })
              } else {
                // run over all tests
                glob('../tests/**/*.test.js', {cwd: __dirname}, (err, filenames) => {
                  if (err) {
                    console.error('Error while reading test files')
                    throw err
                  }
                  filenames.forEach(filename => {
                    require(filename).runTest(params)
                  })
                })
              }
            })
          })
        })
      })
    })
  })
})
