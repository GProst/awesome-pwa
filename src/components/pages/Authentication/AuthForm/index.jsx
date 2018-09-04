import React from 'react'
import PropTypes from 'prop-types'

import {Form} from './Form'
import {PaperContainer} from './PaperContainer'

import {AUTH_TYPE} from '../constants'

export class AuthForm extends React.Component {
  static displayName = 'AuthForm'

  static propTypes = {
    initialAuthType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  render() {
    return (
      <PaperContainer>
        <Form
          initialAuthType={this.props.initialAuthType}
          authType={this.props.authType}
        />
      </PaperContainer>
    )
  }
}
