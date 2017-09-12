import {validateUser} from './user'
import {validateBrowser} from './browser'

export function validateStore(store) {
  store.subscribe(() => {
    validateBrowser(store)
    validateUser(store)
  })
}
