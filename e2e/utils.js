import {equals} from 'ramda'

export const setWindowSize = ({driver, windowInnerSize, resolution}) => {
  return driver
    .manage()
    .window()
    .getRect()
    .then(({width: outerWidth, height: outerHeight}) => {
      const JS_GET_PADDING = `
        const {outerWidth, outerHeight} = arguments[0]
        console.log('HERE!')
        return {
          horizontal: outerWidth - window.innerWidth,
          vertical: outerHeight - window.innerHeight
        }
      `
      return driver.executeScript(JS_GET_PADDING, {outerWidth, outerHeight})
        .then(padding => {
          const windowSize = {
            width: windowInnerSize.width + padding.horizontal,
            height: windowInnerSize.height + padding.vertical
          }
          return driver
            .manage()
            .window()
            .setRect({
              width: windowSize.width,
              height: windowSize.height,
              x: (resolution.width - windowSize.width) / 2,
              y: (resolution.height - windowSize.height) / 2
            })
            .then(() => {
              const JS_GET_WINDOW_INNER_SIZE = `
                return {
                  width: window.innerWidth,
                  height: window.innerHeight
                }
              `
              return driver.executeScript(JS_GET_WINDOW_INNER_SIZE)
                .catch(err => {
                  console.error('error getting window sizes', err)
                  throw err
                })
                .then(size => {
                  if (!equals(size, windowInnerSize)) {
                    throw new Error('Window inner size was set incorrectly! Make sure if browser can shrink/grow to that size OR if screen has appropriate resolution')
                  }
                })
            })
            .catch(err => {
              console.error('error getting window sizes', err)
              throw err
            })
        })
        .catch(err => {
          console.error('error getting window sizes', err)
          throw err
        })
    })
}
