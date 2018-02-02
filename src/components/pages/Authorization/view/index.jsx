import React from 'react'
import PropTypes from 'prop-types'

import {Wrapper} from './styles'

class AuthPageView extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onInputBlur: PropTypes.func.isRequired
  }

  state = {
    tabIndex: 0
  }

  formShowsErrors(form) {
    return Object.values(form).reduce((hasErrors, field) => {
      return hasErrors || Boolean(field.error)
    }, false)
  }

  onSubmit = (event) => {
    this.props.onSubmit(event)
  }

  onInputChange(fieldName, event) {
    this.props.onInputChange(fieldName, event)
  }

  onInputBlur(fieldName, event) {
    this.props.onInputBlur(fieldName, event)
  }

  onTabChange = (event, tabIndex) => {
    this.setState({tabIndex})
  }

  render() {
    return (
      <Wrapper>
        We are in Auth page
      </Wrapper>
    )
  }
}

export default AuthPageView
