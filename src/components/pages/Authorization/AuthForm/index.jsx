import React from 'react'
import {Subscribe} from 'unstated'

import {Inputs} from './Inputs'
import {ForgotPasswordLink} from './ForgotPasswordLink'
import {SubmitButton} from './SubmitButton'
import {FormContainer} from './FormContainer'

import {AuthPageStateContainer, AUTH_TYPE} from '../stateAuthPage'

export class AuthForm extends React.Component {
  static displayName = 'AuthForm'

  render() {
    return (
      <Subscribe to={[AuthPageStateContainer]}>
        {stateContainer => (
          <FormContainer authType={stateContainer.state.authType}>
            <Inputs />
            {stateContainer.state.authType === AUTH_TYPE.signIn && (
              <ForgotPasswordLink />
            )}
            <SubmitButton authType={stateContainer.state.authType} />
          </FormContainer>
        )}
      </Subscribe>
    )
  }
}
