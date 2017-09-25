import createMuiTheme from 'material-ui/styles/createMuiTheme'

import {themes} from './constants'

const upgradeBreakpoints = (breakpoints) => ({
  ...breakpoints,
  asObject: breakpoints.keys.reduce((asObject, key, index) => { // Mui breakpoints
    asObject[key] = breakpoints.values[index]
    return asObject
  }, { // extra breakpoints (as in Material Design docs)
    xs2: 400,
    xs3: 480,
    sm1: 720,
    sm2: 840,
    md2: 1024,
    lg2: 1440,
    lg3: 1600
  })
})

const createMediaQueries = (breakpoints) => {
  const length = breakpoints.keys.length
  return breakpoints.keys.reduce((queries, key, index) => {
    const capitalizedKey = key.replace(/\b\w/g, l => l.toUpperCase())
    queries[`lt${capitalizedKey}`] = `(max-width: ${breakpoints.values[index] - 1}px)`
    queries[key] = `(min-width: ${breakpoints.values[index]}px)`
    if (index < length - 1) {
      queries[key] += ` and (max-width: ${breakpoints.values[index + 1] - 1}px)`
      queries[`gt${capitalizedKey}`] = `(min-width: ${breakpoints.values[index + 1]}px)`
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
