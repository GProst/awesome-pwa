import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Action} from './Action'
import {AUTH_TYPE} from '../stateAuthPage'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`

export class BottomAction extends React.Component {
  static displayName = 'BottomAction'

  static propTypes = {
    className: PropTypes.string,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  render() {
    const {className, authType} = this.props
    return (
      <Container className={className}>
        <Action
          key='signUp'
          desc='Already have an account?'
          linkText='Sign In'
          toAuthType={AUTH_TYPE.signIn}
          authType={authType}
        />
        <Action
          key='signIn'
          desc='Don’t have an account?'
          linkText='Sign Up'
          toAuthType={AUTH_TYPE.signUp}
          authType={authType}
        />
      </Container>
    )
  }
}
