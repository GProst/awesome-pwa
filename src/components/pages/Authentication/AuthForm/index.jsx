import React from 'react'
import {Subscribe} from 'unstated'
import PropTypes from 'prop-types'

import {Form} from './Form'
import {PaperContainer} from './PaperContainer'

import {AUTH_TYPE, AuthPageStateContainer} from '../stateAuthPage'

export class AuthForm extends React.Component {
  static displayName = 'AuthForm'

  static propTypes = {
    initialAuthType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  render() {
    return (
      <Subscribe to={[AuthPageStateContainer]}>
        {stateContainer => (
          <PaperContainer>
            <Form
              setFormNode={stateContainer.setFormNode}
              initialAuthType={this.props.initialAuthType}
              authType={this.props.authType}
            />
          </PaperContainer>
        )}
      </Subscribe>
    )
  }
}
