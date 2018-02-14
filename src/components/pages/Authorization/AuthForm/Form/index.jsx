import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'
import {InputAdornment} from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'

import {MaterialIcon} from '../../../../reusable/MaterialIcon'
import {FormContainer} from './FormContainer'
import {ForgotPasswordLink} from './ForgotPasswordLink'
import {SubmitButton} from './SubmitButton'

import {AUTH_TYPE} from '../../stateAuthPage'

const Inputs = styled.div`
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

export class Form extends React.Component {
  static displayName = 'Form'

  static propTypes = {
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    setFormNode: PropTypes.func.isRequired,
    animating: PropTypes.bool.isRequired
  }

  state = {
    showPassword: false
  }

  togglePasswordVisibility = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  renderInputs({isSignUp = true} = {}) {
    return (
      <Inputs>
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
      </Inputs>
    )
  }

  render() {
    const {authType, animating, setFormNode} = this.props
    return (
      <Fragment>
        <FormContainer setFormNode={setFormNode} formType={AUTH_TYPE.signUp} authType={authType} animating={animating}>
          {this.renderInputs()}
          <SubmitButton>Sign Up</SubmitButton>
        </FormContainer>
        <FormContainer setFormNode={setFormNode} formType={AUTH_TYPE.signIn} authType={authType} animating={animating}>
          {this.renderInputs({isSignUp: false})}
          <ForgotPasswordLink />
          <SubmitButton>Sign In</SubmitButton>
        </FormContainer>
      </Fragment>
    )
  }
}
