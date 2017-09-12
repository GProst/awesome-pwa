import {clearProfile} from '../../reducers/profile/index'

export const validateUser = (store) => {
  const {auth, profile} = store.getState()

  // if we don't have authToken, then we shouldn't store profile
  if (auth.token === null && profile !== null) {
    store.dispatch(clearProfile())
  }
}
