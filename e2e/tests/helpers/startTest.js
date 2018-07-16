import swd from 'selenium-webdriver'

import {getCapabilities} from './getCapabilities'
import {setWindowSize} from './setWindowSize'
import {RESOLUTION} from '../../constants/supported-capabilities'
import {doesTestMatchFilter} from './doesTestMatchFilter'
import {TEST_STATUS} from '../../constants/test-status'
import {logger} from '../../utils/logger'

const loadApp = async ({testParams, testProps}) => {
  let driver
  try {
    const capabilities = getCapabilities({testParams, testProps})
    driver = new swd.Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build()
    await setWindowSize({
      driver,
      windowInnerSize: testParams.capabilities.windowSize,
      resolution: RESOLUTION
    })
    await driver.get(process.env.APP_URL)
    return driver
  } catch(err) {
    if (driver) driver.quit()
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
    logger.debug(`Starting test with ID=${testProps.id}`)
    logger.debug('Description:', testProps.description)
    logger.debug('Params:', testParams)
    driver = await loadApp({testParams, testProps})
    logger.debug('App loaded, invoking testBody')
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
    logger.error(`Error in startTest function, testID = ${testProps.id}:`, err)
    return result
  }
}
