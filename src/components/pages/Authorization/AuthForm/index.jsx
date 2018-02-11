import React from 'react'
import styled from 'styled-components'
import {Subscribe} from 'unstated'

import {Inputs} from './Inputs'
import {ForgotPasswordLink} from './ForgotPasswordLink'
import {SubmitButton} from './SubmitButton'

import {AuthPageStateContainer, AUTH_TYPE} from '../StateAuthPage'

export const Container = styled.div`
  background: white;
  border-radius: 19px;
  padding: 38px 36px;
  width: 85vw;
  max-width: 360px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export class AuthForm extends React.Component {
  static displayName = 'AuthForm'

  render() {
    return (
      <Subscribe to={[AuthPageStateContainer]}>
        {stateContainer => (
          <Container>
            <Inputs />
            {stateContainer.state.authType === AUTH_TYPE.signIn && (
              <ForgotPasswordLink />
            )}
            <SubmitButton authType={stateContainer.state.authType} />
          </Container>
        )}
      </Subscribe>
    )
  }
}
