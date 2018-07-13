// import swd from 'selenium-webdriver'
import path from 'path'

// import {TEST_PARAM} from '../constants/test-params'
// import {BROWSER_VERSION, BROWSER} from '../constants/supported-capabilities'

import {doesTestMatchFilter} from './helpers/doesTestMatchFilter'
import {startTest} from './helpers/startTest'

const TEST_ID = path.basename(__filename).match(/(\d*)\./)[1]

// Pick 'only' or 'exclude', not both
const testProps = {
  id: TEST_ID,
  description: 'Just initial test :)'
//   only: {
//     [TEST_PARAM.BROWSER_VERSION]: [BROWSER_VERSION[BROWSER.CHROME].v67]
//   },
//   exclude: {
//     [TEST_PARAM.BROWSER_VERSION]: [BROWSER_VERSION[BROWSER.CHROME].v67]
//   }
}

export const runTest = async params => {
  let driver
  try {
    if (!doesTestMatchFilter(params, testProps)) {
      return
    }
    driver = await startTest(params, TEST_ID)
    testBody(driver)
  } catch(err) {
    console.error(`Error in test with ID = ${TEST_ID}:`, err)
    driver.quit()
    throw err
  }
}

const testBody = async driver => {
  // write unique test part here
  await driver.sleep(3000)
}
