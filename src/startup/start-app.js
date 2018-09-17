import {logger} from '../utils/logger'

export const startApp = () => {
  try {
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
