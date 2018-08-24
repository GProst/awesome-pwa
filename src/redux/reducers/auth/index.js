import {LOGIN} from '../../genericActions/api'
import {CLEAR_TOKEN} from './actions'

export * from './actions'

export const defaultState = {
  token: null
}

export const getAuthInitialState = () => {
  return {...defaultState, token: window.__JWT__ || defaultState.token}
}

export default (previousState = defaultState, action) => {
  switch (action.type) {
    case CLEAR_TOKEN:
      return {
        ...previousState,
        token: null
      }
    case LOGIN: {
      const {token} = action.payload
      return {
        ...previousState,
        token
      }
    }
    default:
      return previousState
  }
}
