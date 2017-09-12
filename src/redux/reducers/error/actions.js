export const CLEAR_ERROR = 'error/CLEAR'
export const SET_ERROR = 'error/SET'

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  }
}

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error
  }
}
