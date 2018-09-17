export const SHOW_MESSAGE = 'snackbar/SHOW_MESSAGE'
export const HIDE_MESSAGE = 'snackbar/HIDE_MESSAGE'

export const showSnackbarMessage = message => {
  return {
    type: SHOW_MESSAGE,
    message
  }
}

export const hideSnackbarMessage = () => {
  return {
    type: HIDE_MESSAGE
  }
}
