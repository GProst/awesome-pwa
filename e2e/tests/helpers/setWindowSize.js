import {equals} from 'ramda'

import {logger} from '../../utils/logger'

export const setWindowSize = async ({driver, windowInnerSize, resolution}) => {
  const {width: outerWidth, height: outerHeight} = await driver.manage().window().getRect()
  const JS_GET_PADDING = `
    const {outerWidth, outerHeight} = arguments[0]
    return {
      horizontal: outerWidth - window.innerWidth,
      vertical: outerHeight - window.innerHeight
    }
  `
  let padding
  try {
    padding = await driver.executeScript(JS_GET_PADDING, {outerWidth, outerHeight})
  } catch(err) {
    logger.error('error getting window sizes', err)
    throw err
  }
  const windowSize = {
    width: windowInnerSize.width + padding.horizontal,
    height: windowInnerSize.height + padding.vertical
  }
  try {
    await driver.manage().window().setRect({
      width: windowSize.width,
      height: windowSize.height,
      x: (resolution.width - windowSize.width) / 2,
      y: (resolution.height - windowSize.height) / 2
    })
  } catch(err) {
    logger.error('Error setting window sizes and position', err)
    throw err
  }
  const JS_GET_WINDOW_INNER_SIZE = `
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  `
  let resultInnerSize
  try {
    resultInnerSize = await driver.executeScript(JS_GET_WINDOW_INNER_SIZE)
  } catch(err) {
    logger.error('error getting window sizes', err)
    throw err
  }
  if (!equals(resultInnerSize, windowInnerSize)) {
    const err = new Error('Window inner size was set incorrectly! Make sure if browser can shrink/grow to that size OR if screen has appropriate resolution')
    err.code = 'ERR_WINDOW_SIZE'
    err.data = resultInnerSize
    throw err
  }
}
