import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link as _Link} from 'react-router-dom'
import {Subscribe} from 'unstated'

import {AuthPageStateContainer, AUTH_TYPE} from '../../state'

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

const Link = styled(_Link)`
  font-size: 16px;
  color: #64FFDA; // TODO: create our color palette and use colors from there
  font-weight: bold;
  background: none;
  border: none;
  outline: none;
  text-decoration: none;
`

export const BottomAction = props => {
  const {className} = props
  return (
    <Subscribe to={[AuthPageStateContainer]}>
      {stateContainer => {
        const {authType} = stateContainer.state
        const isSignUp = authType === AUTH_TYPE.signUp
        return (
          <Container className={className}>
            <Desc>{isSignUp ? 'Already have an account?' : 'Don’t have an account?'}</Desc>
            <Link to={`/authorization?authType=${isSignUp ? AUTH_TYPE.signIn : AUTH_TYPE.signUp}`}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Link>
          </Container>
        )
      }}
    </Subscribe>
  )
}
BottomAction.displayName = 'BottomAction'
BottomAction.propTypes = {
  className: PropTypes.string
}
