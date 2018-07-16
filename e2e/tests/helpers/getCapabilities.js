import {RESOLUTION} from '../../constants/supported-capabilities'

const {APP_URL, CODEBUILD_RESOLVED_SOURCE_VERSION, CODEBUILD_BUILD_ID} = process.env

export const getCapabilities = ({testParams: {capabilities}, testId}) => {
  const {BROWSERSTACK_USER, BROWSERSTACK_KEY} = process.env
  return {
    project: 'Priority Book PWA',
    build: `url:${APP_URL}__git-commit:${CODEBUILD_RESOLVED_SOURCE_VERSION || 'local-build'}__build-id:${CODEBUILD_BUILD_ID || 'local-build'}`,
    name: `test-id-${testId}--window-size: ${capabilities.windowSize.width}x${capabilities.windowSize.height}`,
    os: capabilities.os,
    os_version: capabilities.osVersion,
    browserName: capabilities.browser,
    browser_version: capabilities.browserVersion,
    'browserstack.local': 'false',
    'browserstack.user': BROWSERSTACK_USER,
    'browserstack.key': BROWSERSTACK_KEY,
    resolution: `${RESOLUTION.width}x${RESOLUTION.height}`,
    chromeOptions: {
      args: ['--disable-infobars'] // won't show infobar that browser is run by driver
    }
  }
}
