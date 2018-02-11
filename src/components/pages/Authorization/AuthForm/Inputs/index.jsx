import React from 'react'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'
import {InputAdornment} from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'
import {Subscribe} from 'unstated'

import {MaterialIcon} from '../../../../reusable/MaterialIcon'
import {AuthPageStateContainer, AUTH_TYPE} from '../../stateAuthPage'

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

  state = {
    showPassword: false
  }

  togglePasswordVisibility = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  render() {
    return (
      <Subscribe to={[AuthPageStateContainer]}>
        {stateContainer => {
          const isSignUp = stateContainer.state.authType === AUTH_TYPE.signUp
          return (
            <Container>
              {isSignUp && (
                <InputContainer>
                  <IconContainer>
                    <MaterialIcon name='AccountBox' />
                  </IconContainer>
                  <TextField
                    label='Full Name'
                    autoComplete='name'
                    placeholder='John Doe'
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                    helperText=' '
                  />
                </InputContainer>
              )}
              <InputContainer>
                <IconContainer>
                  <MaterialIcon name='Email' />
                </IconContainer>
                <TextField
                  label='Email'
                  placeholder='johndoe@example.com'
                  autoComplete='email'
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
                  type={this.state.showPassword ? 'text' : 'password'}
                  label='Password'
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  helperText=' '
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={this.togglePasswordVisibility}
                          style={{
                            color: 'black',
                            width: '28px'
                          }}
                        >
                          {this.state.showPassword ? <MaterialIcon name='VisibilityOff' /> : <MaterialIcon name='Visibility' />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </InputContainer>
            </Container>
          )
        }}
      </Subscribe>
    )
  }
}
