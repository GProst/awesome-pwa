import path from 'path'

import {startTest} from './helpers/startTest'
import {takeScreenshot} from './helpers/takeScreenshot'

const TEST_ID = path.basename(__filename).match(/(\d*)\./)[1]

// Keys names of testProps should match keys names of testParams
export const testProps = {
  id: TEST_ID,
  description: 'App opens correctly on / route for NOT logged user in on different window sizes',
  priority: '10',
  type: 'screenshot',
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

// write unique test part inside 'testBody'
const testBody = async ({driver, testParams}) => {
  await driver.sleep(300)
  await takeScreenshot({driver, testId: TEST_ID, stepNumber: 1, testParams})
}

export const runTest = async testParams => startTest({testParams, testProps, testBody})
