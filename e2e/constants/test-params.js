import {BROWSER, BROWSER_VERSION, OS, OS_VERSION, WINDOW_SIZE} from './supported-capabilities'

export const TEST_TYPE = {
  SCREENSHOT: 'screenshot',
  VIDEO: 'video',
  OTHER: 'other'
}
export const TEST_PARAM = {
  BROWSER: 'browsers',
  BROWSER_VERSION: 'browserVersions',
  OS: 'OSs',
  OS_VERSION: 'osVersions',
  PRIORITY: 'priorities',
  TYPE: 'types',
  WINDOW_SIZE: 'windowSizes',
  ID: 'IDs'
}
// object with keys and values from 1 to 20 ({1:1, 2:2, ..., 20:20})
export const TEST_PRIORITY = Array(20).fill().reduce((acc, value, index) => ({...acc, [index + 1]: index + 1}), {})
export const MAP_PARAM_TO_SUPPORTED = {
  [TEST_PARAM.WINDOW_SIZE]: WINDOW_SIZE,
  [TEST_PARAM.BROWSER]: BROWSER,
  [TEST_PARAM.BROWSER_VERSION]: BROWSER_VERSION,
  [TEST_PARAM.OS]: OS,
  [TEST_PARAM.OS_VERSION]: OS_VERSION,
  [TEST_PARAM.TYPE]: TEST_TYPE,
  [TEST_PARAM.PRIORITY]: TEST_PRIORITY
}
