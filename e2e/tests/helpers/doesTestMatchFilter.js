import {BROWSERS, OSS, WINDOW_SIZES} from '../../constants/supported-capabilities'

export const doesTestMatchFilter = (testParams, testProps) => {
  const {capabilities} = testProps
  const paramsCapabilities = testParams.capabilities
  if (
    paramsCapabilities.os === OSS.MAC_OSX && paramsCapabilities.browser === BROWSERS.CHROME &&
    (paramsCapabilities.windowSize === WINDOW_SIZES._320_X_568 || paramsCapabilities.windowSize === WINDOW_SIZES._360_X_650)
  ) {
    // Chrome on MacOSX has min 400px wide window
    // So unless we have this windowSize property in test's capabilities 'only' prop, we skip this test
    if (!capabilities.only || !capabilities.only.windowSize.includes(paramsCapabilities.windowSize)) {
      return false
    }
  }
  if (paramsCapabilities.browser === BROWSERS.CHROME && paramsCapabilities.incognito && process.env.ENABLE_CHROME_INCOGNITO !== 'true') {
    // test Chrome incognito only if you want, but not by default because Chrome's Incognito just uses temp storage => should work the same
    return false
  }
  if (!capabilities.only && !capabilities.exclude) {
    return true
  }
  if (capabilities.only && capabilities.exclude) {
    throw new Error('testProps cant contain both \'only\' and \'exclude\' props')
  }
  if (capabilities.only) {
    return Object.entries(capabilities.only).reduce(
      (isMatch, [capabilityKey, capabilityValue]) => isMatch && capabilityValue.includes(paramsCapabilities[capabilityKey]),
      true
    )
  }
  if (capabilities.exclude) {
    return Object.entries(capabilities.exclude).reduce(
      (isMatch, [capabilityKey, capabilityValue]) => isMatch && !capabilityValue.includes(paramsCapabilities[capabilityKey]),
      true
    )
  }
}
