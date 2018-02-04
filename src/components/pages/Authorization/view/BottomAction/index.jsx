import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {AUTH_TYPE} from '../../constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Desc = styled.span`
  font-size: 14px;
  color: white;
  line-height: 24px;
`

const Button = styled.button`
  font-size: 16px;
  color: #64FFDA; // TODO: create our color palette and use colors from there
  font-weight: bold;
  background: none;
  border: none;
  outline: none;
`

export const BottomAction = props => {
  const {authType, className, switchAuthType} = props
  return (
    <Container className={className}>
      <Desc>{authType === AUTH_TYPE.signUp ? 'Already have an account?' : 'Don’t have an account?'}</Desc>
      <Button onClick={switchAuthType}>{authType === AUTH_TYPE.signUp ? 'Sign In' : 'Sign Up'}</Button>
    </Container>
  )
}
BottomAction.displayName = 'BottomAction'
BottomAction.propTypes = {
  switchAuthType: PropTypes.func.isRequired,
  className: PropTypes.string,
  authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
}
