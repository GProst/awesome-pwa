import React from 'react'
import PropTypes from 'prop-types'
import {MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import red from '@material-ui/core/colors/red'
import teal from '@material-ui/core/colors/teal'
import purple from '@material-ui/core/colors/purple'

const muiTheme = createMuiTheme({
  palette: {
    'primary': {
      ...purple
    },
    'secondary': {
      ...teal
    },
    'error': {
      ...red
    }
  }
})

export class ThemeProvider extends React.Component {
  static displayName = 'ThemeProvider'

  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}
