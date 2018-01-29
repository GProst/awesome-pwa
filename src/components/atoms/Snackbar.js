import React from 'react'
import PropTypes from 'prop-types'
import withTheme from 'material-ui/styles/withTheme'
import withStyles from 'material-ui/styles/withStyles'

import Snackbar from 'material-ui/Snackbar'

class SnackbarClassesProvider extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    SnackbarContentProps: PropTypes.object
  }

  render() {
    const {classes, SnackbarContentProps = {}, ...props} = this.props
    SnackbarContentProps.classes = classes

    return <Snackbar {...props} SnackbarContentProps={SnackbarContentProps} />
  }
}

class MySnackbar extends React.Component {
  static propTypes = {
    status: PropTypes.oneOf(['default', 'error']).isRequired,
    message: PropTypes.any,
    theme: PropTypes.object.isRequired
  }

  static defaultProps = {
    status: 'default',
    message: ''
  }

  state = {}

  calculateColor(status) {
    if (!status) return
    if (status === 'error') {
      this.setState({
        styles: {
          root: {}
        }
      })
    }
  }

  componentWillMount() {
    this.calculateColor(this.props.status)
    this.setState({
      message: this.props.message
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status !== this.props.status) {
      this.calculateColor(nextProps.status)
    }

    if (nextProps.message) { // setting message only if we have one (otherwise content may suddenly disappear onExit)
      this.setState({
        message: nextProps.message
      })
    }
  }

  render() {
    const {status, theme, message, ...props} = this.props
    const {styles} = this.state

    if (!this.Snackbar && styles) {
      this.Snackbar = withStyles(styles)(SnackbarClassesProvider)
    }
    const Component = this.Snackbar || Snackbar

    return (
      <Component {...props} message={this.state.message} />
    )
  }
}

export default withTheme(MySnackbar)
