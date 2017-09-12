export const CLEAR_TOKEN = 'auth/CLEAR'
export const SET_TOKEN = 'auth/SET'

export const clearToken = () => {
  return {
    type: CLEAR_TOKEN
  }
}

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token
  }
}
