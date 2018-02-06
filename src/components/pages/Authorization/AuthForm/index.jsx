import React from 'react'
import styled from 'styled-components'

import {Inputs} from './Inputs'

export const Container = styled.div`
  background: white;
  border-radius: 19px;
  padding: 38px 36px;
  width: 85vw;
  max-width: 360px;
  box-sizing: border-box;
`

export class AuthForm extends React.Component {
  static displayName = 'AuthForm'

  render() {
    return (
      <Container>
        <Inputs />
      </Container>
    )
  }
}
