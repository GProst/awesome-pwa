import {startTest} from '../helpers/startTest'
import {takeScreenshot} from '../helpers/takeScreenshot'
import {getTestId} from '../helpers/getTestId'
import {addTestStats} from '../../utils/stats'

const TEST_ID = getTestId(__filename)

// Keys names of testProps should match keys names of testParams
export const testProps = {
  id: TEST_ID,
  description: 'App opens correctly on / route for NOT logged in user on different window sizes',
  capabilities: {
  //   Pick 'only' or 'exclude', not both
  //   only: {
  //     browserVersion: [BROWSER_VERSIONS[BROWSERS.CHROME].v67]
  //   },
  //   exclude: {
  //     browserVersion: [BROWSER_VERSIONS[BROWSERS.CHROME].v67]
  //   }
  }
}

const stats = {
  props: testProps,
  paramsCapabilities: []
}
addTestStats({dirname: __dirname, stats})

// write unique test part inside 'testBody'
const testBody = async ({driver, testParams}) => {
  await driver.sleep(300)
  await takeScreenshot({driver, testId: TEST_ID, stepNumber: 1, testParams})
}

export const runTest = async testParams => startTest({testParams, testProps, testBody})
