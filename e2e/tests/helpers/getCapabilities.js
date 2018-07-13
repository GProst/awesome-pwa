import {TEST_PARAM} from '../../constants/test-params'
import {RESOLUTION} from '../../constants/supported-capabilities'

export const getCapabilities = params => {
  const {BROWSERSTACK_USER, BROWSERSTACK_KEY} = process.env
  return {
    os: params[TEST_PARAM.OS],
    os_version: params[TEST_PARAM.OS_VERSION],
    browserName: params[TEST_PARAM.BROWSER],
    browser_version: params[TEST_PARAM.BROWSER_VERSION],
    'browserstack.local': 'false',
    'browserstack.user': BROWSERSTACK_USER,
    'browserstack.key': BROWSERSTACK_KEY,
    resolution: `${RESOLUTION.width}x${RESOLUTION.height}`,
    chromeOptions: {
      args: ['--disable-infobars'] // won't show infobar that browser is run by driver
    }
  }
}
