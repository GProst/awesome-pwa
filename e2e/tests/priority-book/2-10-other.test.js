import {startTest} from '../helpers/startTest'
import {WINDOW_SIZES, BROWSERS, OSS} from '../../constants/supported-capabilities'
import {TEST_STATUS} from '../../constants/test-status'
import {getTestId} from '../helpers/getTestId'
import {logger} from '../../utils/logger'
import {addTestStats} from '../../utils/stats'

const TEST_ID = getTestId(__filename)

// Keys names of testProps should match keys names of testParams
export const testProps = {
  id: TEST_ID,
  description: 'Chrome browser window in Mac OSX can\'t shrink less than 400px wide',
  capabilities: {
    //   Pick 'only' or 'exclude', not both
    only: {
      os: [OSS.MAC_OSX],
      browser: [BROWSERS.CHROME],
      windowSize: [WINDOW_SIZES._320_X_568, WINDOW_SIZES._360_X_650],
      incognito: [false]
    }
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
const testBody = async ({driver, testParams}) => { /* empty */ }
const errorHandler = ({err, testParams, result}) => {
  if (
    err.code === 'ERR_WINDOW_SIZE' &&
    err.data.width === 400 &&
    err.data.height === testParams.capabilities.windowSize.height
  ) {
    result.status = TEST_STATUS.SUCCESS
  } else {
    logger.error(`Error in startTest function, testID = ${testProps.id}:`, err)
  }
  return result
}

export const runTest = async testParams => startTest({testParams, testProps, testBody, errorHandler})
