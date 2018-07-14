import path from 'path'

import {startTest} from './helpers/startTest'
import {takeScreenshot} from './helpers/takeScreenshot'

const TEST_ID = path.basename(__filename).match(/(\d*)\./)[1]

// Pick 'only' or 'exclude', not both
const testProps = {
  id: TEST_ID,
  description: 'App opens correctly on / route for NOT logged user in on different window sizes',
  priority: '10',
  type: 'screenshot',
  capability: {
  //   only: {
  //     [FILTER_PARAMS.BROWSER_VERSIONS]: [BROWSER_VERSIONS[BROWSERS.CHROME].v67]
  //   },
  //   exclude: {
  //     [FILTER_PARAMS.BROWSER_VERSIONS]: [BROWSER_VERSIONS[BROWSERS.CHROME].v67]
  //   }
  }
}

// write unique test part inside 'testBody'
const testBody = async ({driver, params}) => {
  await driver.sleep(300)
  await takeScreenshot({driver, testId: TEST_ID, stepNumber: 1, params})
}

export const runTest = async params => startTest({params, testProps, testBody})
