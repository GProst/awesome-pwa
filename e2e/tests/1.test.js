import path from 'path'

import {startTest} from './helpers/startTest'

const TEST_ID = path.basename(__filename).match(/(\d*)\./)[1]

// Pick 'only' or 'exclude', not both
const testProps = {
  id: TEST_ID,
  description: 'Just initial test :)',
  priority: '10',
  type: 'other',
  capability: {
  //   only: {
  //     [TEST_PARAM.BROWSER_VERSION]: [BROWSER_VERSION[BROWSER.CHROME].v67]
  //   },
  //   exclude: {
  //     [TEST_PARAM.BROWSER_VERSION]: [BROWSER_VERSION[BROWSER.CHROME].v67]
  //   }
  }
}

const testBody = async driver => {
  // write unique test part here
  await driver.sleep(3000)
}

export const runTest = async params => startTest({params, testProps, testBody})
