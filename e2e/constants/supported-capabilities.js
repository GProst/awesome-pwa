// In this file are defined dictionaries of supported capabilities by BrowserStack

export const WINDOW_SIZES = {
  _320_X_568: {
    width: 320,
    height: 568
  },
  _360_X_650: {
    width: 360,
    height: 650
  },
  _400_X_728: {
    width: 400,
    height: 728
  }
}

export const RESOLUTION = {
  width: 1920,
  height: 1080
}

export const BROWSERS = {
  // SAFARI: 'Safari',
  // FIREFOX: 'Firefox',
  CHROME: 'Chrome'
}

export const BROWSER_VERSIONS = {
  [BROWSERS.CHROME]: {
    v67: '67.0'
  }
}

export const OSS = {
  MAC_OSX: 'OS X'
}

export const OS_VERSIONS = {
  [OSS.MAC_OSX]: {
    HIGH_SIERRA: 'High Sierra'
  }
}

export const BROWSERS_OF_OSS = {
  [OSS.MAC_OSX]: [BROWSERS.CHROME]
}

// object with keys and values from 1 to 20 ({1:1, 2:2, ..., 20:20})
export const TEST_PRIORITIES = Array(20).fill().reduce((acc, value, index) => ({...acc, [index + 1]: index + 1}), {})

export const TEST_TYPES = {
  SCREENSHOT: 'screenshot',
  VIDEO: 'video',
  OTHER: 'other'
}
