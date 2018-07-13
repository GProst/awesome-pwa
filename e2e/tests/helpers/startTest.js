import swd from 'selenium-webdriver'

import {getCapabilities} from './getCapabilities'
import {setWindowSize} from './setWindowSize'
import {TEST_PARAM} from '../../constants/test-params'
import {RESOLUTION} from '../../constants/supported-capabilities'

export const startTest = async (params, id) => {
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
