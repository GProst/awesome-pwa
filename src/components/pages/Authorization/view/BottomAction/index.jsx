import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Subscribe, Provider} from 'unstated'

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

const Button = styled.button`
  font-size: 16px;
  color: #64FFDA; // TODO: create our color palette and use colors from there
  font-weight: bold;
  background: none;
  border: none;
  outline: none;
`

export const BottomAction = props => {
  const {className} = props
  return (
    <Provider inject={[new AuthPageStateContainer()]}>
      <Subscribe to={[AuthPageStateContainer]}>
        {container => (
          <Container className={className}>
            <Desc>{container.state.authType === AUTH_TYPE.signUp ? 'Already have an account?' : 'Don’t have an account?'}</Desc>
            <Button onClick={container.switchAuthType}>{container.state.authType === AUTH_TYPE.signUp ? 'Sign In' : 'Sign Up'}</Button>
          </Container>
        )}
      </Subscribe>
    </Provider>
  )
}
BottomAction.displayName = 'BottomAction'
BottomAction.propTypes = {
  className: PropTypes.string
}
