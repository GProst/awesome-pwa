export const CLEAR_PROFILE = 'profile/CLEAR'
export const SET_PROFILE = 'profile/SET'

export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE
  }
}

export const setProfile = (profile) => {
  return {
    type: SET_PROFILE,
    payload: profile
  }
}
