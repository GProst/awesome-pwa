import api from '../../../api'

export const LOGIN = 'api/LOGIN'

const setTokenAndProfile = (token, profile) => {
  return {
    type: LOGIN,
    payload: {
      profile,
      token
    }
  }
}

export const login = () => {
  return dispatch => {
    return api.login()
      .then(({profile, token}) => {
        dispatch(setTokenAndProfile(token, profile))
      })
      .catch(err => {
        throw err
      })
  }
}
