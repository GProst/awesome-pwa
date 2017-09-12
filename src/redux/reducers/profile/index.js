import {CLEAR_PROFILE, SET_PROFILE} from './actions'
import {LOGIN} from '../../genericActions/api'

export * from './actions'

export const defaultState = null

export default (previousState = defaultState, action) => {
  switch (action.type) {
    case CLEAR_PROFILE:
      return defaultState
    case SET_PROFILE:
      return action.payload
    case LOGIN:
      return action.payload.profile
    default:
      return previousState
  }
}
