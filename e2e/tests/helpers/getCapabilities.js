import {RESOLUTION} from '../../constants/supported-capabilities'

const {
  APP_URL,
  CODEBUILD_RESOLVED_SOURCE_VERSION,
  CODEBUILD_BUILD_ID,
  ENABLE_VIDEO,
  BROWSERSTACK_USER,
  BROWSERSTACK_KEY,
  PROJECT
} = process.env

export const getCapabilities = ({testParams: {capabilities}, testProps}) => {
  const isIncognito = capabilities.incognito
  return {
    project: PROJECT,
    build: `url:${APP_URL}__git-commit:${CODEBUILD_RESOLVED_SOURCE_VERSION || 'local-build'}__build-id:${CODEBUILD_BUILD_ID || 'local-build'}`,
    name: `test-id-${testProps.id}__window-size: ${capabilities.windowSize.width}x${capabilities.windowSize.height}${isIncognito ? '__incognito' : ''}`,
    os: capabilities.os,
    os_version: capabilities.osVersion,
    browserName: capabilities.browser,
    browser_version: capabilities.browserVersion,
    'browserstack.local': 'false',
    'browserstack.user': BROWSERSTACK_USER,
    'browserstack.key': BROWSERSTACK_KEY,
    'browserstack.video': ENABLE_VIDEO || (testProps.type === 'video').toString(),
    'browserstack.console': 'disable',
    resolution: `${RESOLUTION.width}x${RESOLUTION.height}`,
    chromeOptions: {
      args: [
        isIncognito && '--incognito',
        '--disable-infobars' // won't show infobar that browser 'is run by driver'
      ].filter(Boolean)
    }
  }
}
