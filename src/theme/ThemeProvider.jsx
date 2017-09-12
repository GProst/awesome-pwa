import React from 'react'
import PropTypes from 'prop-types'
import {ThemeProvider as CSThemeProvider} from 'styled-components'
import {connect} from 'react-redux'
import {MuiThemeProvider} from 'material-ui/styles'

import {ThemeType} from './constants'
import {createTheme} from './functions'

const connector = connect(state => ({
  theme: state.theme
}))

class ThemeProvider extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    theme: PropTypes.oneOf(Object.values(ThemeType)).isRequired
  }

  state = {}

  setTheme(themeType) {
    const theme = createTheme(themeType)
    this.setState({
      theme
    })
  }

  componentWillMount() {
    this.setTheme(this.props.theme)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      this.setTheme(nextProps.theme)
    }
  }

  render() {
    const {theme} = this.state

    return (
      <CSThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          {this.props.children}
        </MuiThemeProvider>
      </CSThemeProvider>
    )
  }
}

export default connector(ThemeProvider)
