import {CLEAR_ERROR, SET_ERROR} from './actions'

export * from './actions'

export const defaultState = null

// TODO: add validation for error on actions and initial valueΩ

export default (previousState = defaultState, action) => {
  switch (action.type) {
    case CLEAR_ERROR:
      return defaultState
    case SET_ERROR:
      return action.payload
    default:
      return previousState
  }
}
