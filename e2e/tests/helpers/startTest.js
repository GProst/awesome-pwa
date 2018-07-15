import swd from 'selenium-webdriver'

import {getCapabilities} from './getCapabilities'
import {setWindowSize} from './setWindowSize'
import {RESOLUTION} from '../../constants/supported-capabilities'
import {doesTestMatchFilter} from './doesTestMatchFilter'
import {TEST_STATUS} from '../../constants/test-status'

const loadApp = async (testParams, testId) => {
  let driver
  try {
    const capabilities = getCapabilities({testParams, testId})
    driver = new swd.Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build()
    await setWindowSize({
      driver,
      windowInnerSize: testParams.capabilities.windowSize,
      resolution: RESOLUTION
    })
    await driver.get(process.env.APP_URL || 'https://dwgo2lfl43tk4.cloudfront.net/')
    return driver
  } catch(err) {
    driver.quit()
    throw err
  }
}

export const startTest = async ({testParams, testProps, testBody, errorHandler}) => {
  let driver
  const result = {testParams, testProps}
  try {
    if (!doesTestMatchFilter(testParams, testProps)) {
      result.status = TEST_STATUS.FILTERED
      return result
    }
    driver = await loadApp(testParams, testProps.id)
    await testBody({driver, testParams})
    driver.quit()
    result.status = TEST_STATUS.SUCCESS
    return result
  } catch(err) {
    if (driver) driver.quit()
    result.status = TEST_STATUS.FAIL
    if (errorHandler) {
      return errorHandler({err, testParams, result})
    }
    console.error(`Error in startTest function, testID = ${testProps.id}:`, err)
    return result
  }
}
