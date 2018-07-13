// In this file are defined dictionaries of supported capabilities by BrowserStack

export const WINDOW_SIZE = {
  _320_X_568: {
    width: 320,
    height: 568
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

export const BROWSER = {
  // SAFARI: 'Safari',
  // FIREFOX: 'Firefox',
  CHROME: 'Chrome'
}

export const BROWSER_VERSION = {
  [BROWSER.CHROME]: {
    v67: '67.0'
  }
}

export const OS = {
  MAC_OSX: 'OS X'
}

export const OS_VERSION = {
  [OS.MAC_OSX]: {
    HIGH_SIERRA: 'High Sierra'
  }
}

export const BROWSERS_OF_OS = {
  [OS.MAC_OSX]: [BROWSER.CHROME]
}
