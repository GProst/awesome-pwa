import React from 'react'
import styled from 'styled-components'
import _TextField from 'material-ui/TextField'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`

const TextField = styled(_TextField)`
  margin-top: 10px!important;

  :first-child {
    margin-top: 0!important;
  }
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
          helperText=' '
        />
        <TextField
          label='Email'
          placeholder='johndoe@example.com'
          InputLabelProps={{
            shrink: true
          }}
          helperText=' '
        />
        <TextField
          type='password'
          label='Password'
          InputLabelProps={{
            shrink: true
          }}
          helperText=' '
        />
      </Container>
    )
  }
}
