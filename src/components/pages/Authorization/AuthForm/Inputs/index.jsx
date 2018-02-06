import React from 'react'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`

export class Inputs extends React.Component {
  static displayName = 'Inputs'

  render() {
    return (
      <Container>
        <TextField
          label='Full Name'
          placeholder='John Doe'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label='Email'
          placeholder='johndoe@example.com'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          type='password'
          label='Password'
          InputLabelProps={{
            shrink: true
          }}
        />
      </Container>
    )
  }
}
