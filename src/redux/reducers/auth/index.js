import {CLEAR_TOKEN, SET_TOKEN} from './actions'
import api from '../../../api'

import {LOGIN} from '../../genericActions/api'

export * from './actions'

export const defaultState = {
  token: null
}

export const getAuthInitialState = () => {
  return {...defaultState, token: api.readTokenCookie() || defaultState.token}
}

export default (previousState = defaultState, action) => {
  switch (action.type) {
    case CLEAR_TOKEN:
      api.deleteTokenCookie()
      return defaultState
    case SET_TOKEN: {
      const token = action.payload
      api.setTokenCookie(token)
      return {
        ...previousState,
        token
      }
    }
    case LOGIN: {
      const {token} = action.payload
      api.setTokenCookie(token)
      return {
        ...previousState,
        token
      }
    }
    default:
      return previousState
  }
}
