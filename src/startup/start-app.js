import {logger} from '../utils/logger'

let startAppCalled = false

let oncontrollerchangeTimeout

// I have two options to start an app:
// 1. When I receive 100% installation progress
// 2. When I receive oncontrollerchange event
// I don't pick only one because I'm not sure that I will always receive 100% message from SW (who knows why)
// And oncontrollerchange event sometimes isn't fired (probably because when I write it PWA is still experimental stage)
export const setAppStartTimeout = () => {
  oncontrollerchangeTimeout = setTimeout(startApp, 100) // why wait long?
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
