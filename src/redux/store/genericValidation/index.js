import {validateUser} from './user'

export function validateStore(store) {
  store.subscribe(() => {
    validateUser(store)
  })
}
