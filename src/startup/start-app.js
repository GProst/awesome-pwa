import {logger} from '../utils/logger'

let startAppCalled = false

let oncontrollerchangeTimeout

// I have two options to start an app:
// 1. When I receive oncontrollerchange event
// 2. When I receive 100% installation progress
// I don't pick only one because oncontrollerchange event sometimes isn't fired (probably because when I write it PWA is still experimental stage)
// And I want SW to be active by the time I start the app so that subsequent requests are interfered by SW
export const setAppStartTimeout = () => {
  // we need to wait longer to give a chance SW to finish installation and activation stages (so that requests that we'll make were retrieved from cache)
  // you need to understand that if it's slow 3G then downloading assets will take much time, so TODO: set timeout time depending on network connection
  oncontrollerchangeTimeout = setTimeout(startApp, 5000)
}

export const startApp = () => {
  try {
    if (oncontrollerchangeTimeout) clearTimeout(oncontrollerchangeTimeout)
    if (startAppCalled) return // this can happen if I started the app based on the timeout and then 'oncontrollerchange' fired anyway
    startAppCalled = true
    const fragment = document.createDocumentFragment()
    const vendors = document.createElement('script')
    vendors.src = '/vendors.js'
    fragment.appendChild(vendors)
    const app = document.createElement('script')
    app.src = '/app.js'
    fragment.appendChild(app)
    document.body.appendChild(fragment)
  } catch(err) {
    logger.errorRemote(err, {extra: {message: 'Error in startApp function'}})
  }
}
