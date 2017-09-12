export const SET_THEME = 'theme/SET'

export const setTheme = (themeType) => {
  return {
    type: SET_THEME,
    payload: themeType
  }
}
