import {equals} from 'ramda'

export const setWindowSize = async ({driver, windowInnerSize, resolution}) => {
  const {width: outerWidth, height: outerHeight} = await driver.manage().window().getRect()
  const JS_GET_PADDING = `
    const {outerWidth, outerHeight} = arguments[0]
    console.log('HERE!')
    return {
      horizontal: outerWidth - window.innerWidth,
      vertical: outerHeight - window.innerHeight
    }
  `
  let padding
  try {
    padding = await driver.executeScript(JS_GET_PADDING, {outerWidth, outerHeight})
  } catch(err) {
    console.error('error getting window sizes', err)
    throw err
  }
  const windowSize = {
    width: windowInnerSize.width + padding.horizontal,
    height: windowInnerSize.height + padding.vertical
  }
  await driver.manage().window().setRect({
    width: windowSize.width,
    height: windowSize.height,
    x: (resolution.width - windowSize.width) / 2,
    y: (resolution.height - windowSize.height) / 2
  })
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
    console.error('error getting window sizes', err)
    throw err
  }
  if (!equals(resultInnerSize, windowInnerSize)) {
    throw new Error('Window inner size was set incorrectly! Make sure if browser can shrink/grow to that size OR if screen has appropriate resolution')
  }
}
