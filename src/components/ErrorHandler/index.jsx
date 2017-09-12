import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {clearError} from '../../redux/reducers/error'

import Fade from 'material-ui/transitions/Fade'
import Snackbar from '../atoms/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import {ErrorSnackBarContent, Wrapper, closeButtonStyles} from './styles'

const connector = connect(
  state => ({
    error: state.error
  }),
  dispatch => ({
    clearError() {
      dispatch(clearError())
    }
  })
)

class ErrorHandler extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    error: PropTypes.string,
    clearError: PropTypes.func.isRequired
  }

  closeSnackbar = () => {
    this.props.clearError()
  }

  onSnackbarClose = (event, reason) => {
    if (reason === 'timeout') {
      this.props.clearError()
    }
  }

  renderErrorMessage(error) {
    return (
      <ErrorSnackBarContent>
        {error}
      </ErrorSnackBarContent>
    )
  }

  renderAction() {
    return (
      <IconButton
        color='inherit'
        onClick={this.closeSnackbar}
        style={closeButtonStyles}
      >
        <CloseIcon />
      </IconButton>
    )
  }

  render() {
    const {error} = this.props
    return (
      <Wrapper>
        <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          open={Boolean(error)}
          message={error && this.renderErrorMessage(error)}
          action={this.renderAction()}
          status='error'
          transition={Fade}
          autoHideDuration={7000}
          onRequestClose={this.onSnackbarClose}
        />
        {this.props.children}
      </Wrapper>
    )
  }
}

export default connector(ErrorHandler)
