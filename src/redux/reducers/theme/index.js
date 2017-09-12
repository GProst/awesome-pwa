import {SET_THEME} from './actions'
import {ThemeType} from '../../../theme/constants'

export * from './actions'

export const defaultState = ThemeType.light

// TODO: add validation for profile on actions

export default (previousState = defaultState, action) => {
  switch (action.type) {
    case SET_THEME:
      return action.payload
    default:
      return previousState
  }
}
