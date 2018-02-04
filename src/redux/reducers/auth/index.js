import {LOGIN} from '../../genericActions/api'
import {CLEAR_TOKEN} from './actions'

export * from './actions'

export const defaultState = {
  token: null
}

// TODO: add validation for token on actions and initial value (just do it before return it, even
// if it is default previous state)

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
