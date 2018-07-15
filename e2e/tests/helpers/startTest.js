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
    console.error(`Error starting test with ID = ${testId}:`, err)
    driver.quit()
    throw err
  }
}

export const startTest = async ({testParams, testProps, testBody}) => {
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
    console.error(`Error in test with ID = ${testProps.id}:`, err)
    driver.quit()
    result.status = TEST_STATUS.FAIL
    return result
  }
}
