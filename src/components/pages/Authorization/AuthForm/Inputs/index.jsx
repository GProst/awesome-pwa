import React from 'react'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'

import {MaterialIcon} from '../../../../reusable/MaterialIcon'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`

const InputContainer = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  margin-top: 10px;

  :first-child {
    margin-top: 0;
  }
`

const IconContainer = styled.div`
  margin-right: 8px;
  height: 32px;
`

export class Inputs extends React.Component {
  static displayName = 'Inputs'

  render() {
    return (
      <Container>
        <InputContainer>
          <IconContainer>
            <MaterialIcon name='AccountBox' />
          </IconContainer>
          <TextField
            label='Full Name'
            placeholder='John Doe'
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            helperText=' '
          />
        </InputContainer>
        <InputContainer>
          <IconContainer>
            <MaterialIcon name='Email' />
          </IconContainer>
          <TextField
            label='Email'
            placeholder='johndoe@example.com'
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            helperText=' '
          />
        </InputContainer>
        <InputContainer>
          <IconContainer>
            <MaterialIcon name='Lock' />
          </IconContainer>
          <TextField
            type='password'
            label='Password'
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            helperText=' '
          />
        </InputContainer>
      </Container>
    )
  }
}
