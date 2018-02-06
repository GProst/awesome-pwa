import React from 'react'
import styled from 'styled-components'
import {Link as _Link} from 'react-router-dom'

export const Link = styled(_Link)`
  color: #757575;
  font-size: 12px;
  text-decoration: none;
  margin-top: 5px;
  align-self: flex-end;
  
  :hover {
    text-decoration: underline;
  }
`

export class ForgotPasswordLink extends React.Component {
  static displayName = 'ForgotPasswordLink'

  render() {
    return (
      <Link to={'/forgot-password'}>
        Forgot password?
      </Link>
    )
  }
}
