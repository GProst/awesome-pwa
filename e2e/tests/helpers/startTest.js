import swd from 'selenium-webdriver'

import {getCapabilities} from './getCapabilities'
import {setWindowSize} from './setWindowSize'
import {TEST_PARAM} from '../../constants/test-params'
import {RESOLUTION} from '../../constants/supported-capabilities'
import {doesTestMatchFilter} from './doesTestMatchFilter'
import {TEST_STATUS} from '../../constants/test-status'

const loadApp = async (params, id) => {
  let driver
  try {
    const capabilities = getCapabilities(params)
    driver = new swd.Builder()
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities(capabilities)
      .build()
    await setWindowSize({
      driver,
      windowInnerSize: params[TEST_PARAM.WINDOW_SIZE],
      resolution: RESOLUTION
    })
    await driver.get('https://dwgo2lfl43tk4.cloudfront.net/')
    return driver
  } catch(err) {
    console.error(`Error starting test with ID = ${id}:`, err)
    driver.quit()
    throw err
  }
}

export const startTest = async ({params, testProps, testBody}) => {
  let driver
  const result = {params, testProps}
  try {
    if (!doesTestMatchFilter(params, testProps)) {
      result.status = TEST_STATUS.FILTERED
      return result
    }
    driver = await loadApp(params, testProps.id)
    await testBody({driver, params})
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
