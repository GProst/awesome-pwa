import createMuiTheme from 'material-ui/styles/createMuiTheme'

import {themes} from './constants'

const upgradeBreakpoints = (breakpoints) => ({
  ...breakpoints,
  asObject: breakpoints.keys.reduce((asObject, key, index) => {
    asObject[key] = breakpoints.values[index]
    return asObject
  }, {})
})

const createMediaQueries = (breakpoints) => {
  const length = breakpoints.keys.length
  return breakpoints.keys.reduce((queries, key, index) => {
    queries[`lt${key}`] = `(max-width: ${breakpoints.values[index] - 1}px)`
    queries[key] = `(min-width: ${breakpoints.values[index]}px)`
    if (index < length - 1) {
      queries[key] += ` and (max-width: ${breakpoints.values[index + 1] - 1}px)`
      queries[`gt${key}`] = `(min-width: ${breakpoints.values[index + 1]}px)`
    }
    return queries
  }, {})
}

// we create one mui theme and share it with styled-components theme provider
const createTheme = (themeType) => {
  const theme = themes.get(themeType)

  const muiTheme = createMuiTheme({
    ...theme,
    palette: {
      ...theme.palette,
      type: themeType
    }
  })

  muiTheme.breakpoints = upgradeBreakpoints(muiTheme.breakpoints)
  muiTheme.mediaQueries = createMediaQueries(muiTheme.breakpoints)

  return muiTheme
}

export {
  createTheme
}
