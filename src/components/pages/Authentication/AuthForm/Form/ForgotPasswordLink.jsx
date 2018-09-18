import React from 'react'
import styled from 'styled-components'

export const Link = styled.div`
  cursor: pointer;
  color: #757575;
  font-size: 12px;
  text-decoration: none;
  margin-top: 5px;
  align-self: flex-end;
  
  :hover {
    color: #9C27B0;
  }
`

export class ForgotPasswordLink extends React.Component {
  static displayName = 'ForgotPasswordLink'

  render() {
    return (
      <Link>
        Forgot password?
      </Link>
    )
  }
}
