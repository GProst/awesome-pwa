import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

import {MaterialIcon} from '../../../../reusable/MaterialIcon'
import {FormContent} from './FormContent'
import {ForgotPasswordLink} from './ForgotPasswordLink'
import {SubmitButton} from './SubmitButton'

import {AUTH_TYPE} from '../../constants/index'
import {validateEmail, validateName, validateNewPassword, validatePassword} from './validation'

const FormContainer = styled.form`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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

const FIELD = {
  name: 'name',
  email: 'email',
  password: 'password',
  newPassword: 'newPassword'
}

const defaultFieldErrors = {
  [FIELD.name]: null,
  [FIELD.email]: null,
  [FIELD.password]: null,
  [FIELD.newPassword]: null
}

export class Form extends React.Component {
  static displayName = 'Form'

  static propTypes = {
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    initialAuthType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  static getDerivedStateFromProps(props, state) {
    if (state.authType !== props.authType) {
      return {
        showPassword: false,
        fields: {
          ...state.fields,
          [FIELD.password]: '',
          [FIELD.newPassword]: ''
        },
        errors: {
          ...defaultFieldErrors
        },
        authType: props.authType
      }
    }
    return null
  }

  state = {
    showPassword: false,
    fields: {
      [FIELD.name]: '',
      [FIELD.email]: '',
      [FIELD.password]: '',
      [FIELD.newPassword]: ''
    },
    errors: {
      ...defaultFieldErrors
    },
    authType: this.props.authType
  }

  validateField = (field, value) => {
    let validationState = {status: true, error: null}
    switch (field) {
      case FIELD.name: {
        validationState = validateName(value)
        break
      }
      case FIELD.email: {
        validationState = validateEmail(value)
        break
      }
      case FIELD.newPassword: {
        if (this.props.authType === AUTH_TYPE.signIn) break
        validationState = validateNewPassword(value)
        break
      }
      case FIELD.password: {
        if (this.props.authType === AUTH_TYPE.signUp) break
        validationState = validatePassword(value)
        break
      }
    }
    // TODO: I probably don't need to call it if validationState.status === true
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [field]: validationState.error
      }
    }))
    return validationState.status
  }

  validateFields = () => {
    return Object.values(FIELD).reduce((validationStatus, fieldType) => {
      return this.validateField(fieldType, this.state.fields[fieldType]) && validationStatus
    }, true)
  }

  togglePasswordVisibility = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  onInputChange = (field, e) => {
    const {value} = e.target
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: value
      },
      errors: {
        ...this.state.errors,
        [field]: null
      }
    })
  }

  onInputBlur = (field, e) => {
    const {value} = e.target
    this.validateField(field, value)
  }

  onSubmit = e => {
    e.preventDefault()
    this.validateFields()
    // TODO
  }

  renderInputs({isSignUp = true} = {}) {
    const {fields, errors} = this.state
    const passwordField = this.props.authType === AUTH_TYPE.signIn ? FIELD.password : FIELD.newPassword
    return (
      <Inputs>
        {isSignUp && (
          <InputContainer>
            <IconContainer>
              <MaterialIcon name='AccountBox' />
            </IconContainer>
            <TextField
              value={fields[FIELD.name]}
              onChange={e => { this.onInputChange(FIELD.name, e) }}
              inputProps={{
                onBlur: e => { this.onInputBlur(FIELD.name, e) }
              }}
              label='Full Name'
              autoComplete='name'
              placeholder='John Doe'
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              helperText={errors[FIELD.name] || ' '}
              error={Boolean(errors[FIELD.name])}
            />
          </InputContainer>
        )}
        <InputContainer>
          <IconContainer>
            <MaterialIcon name='Email' />
          </IconContainer>
          <TextField
            value={fields[FIELD.email]}
            onChange={e => { this.onInputChange(FIELD.email, e) }}
            inputProps={{
              onBlur: e => { this.onInputBlur(FIELD.email, e) }
            }}
            label='Email'
            placeholder='johndoe@example.com'
            autoComplete='email'
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            helperText={errors[FIELD.email] || ' '}
            error={Boolean(errors[FIELD.email])}
          />
        </InputContainer>
        <InputContainer>
          <IconContainer>
            <MaterialIcon name='Lock' />
          </IconContainer>
          <TextField
            value={fields[passwordField]}
            onChange={e => { this.onInputChange(passwordField, e) }}
            inputProps={{
              onBlur: e => { this.onInputBlur(passwordField, e) }
            }}
            type={this.state.showPassword ? 'text' : 'password'}
            label='Password'
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            helperText={errors[passwordField] || ' '}
            error={Boolean(errors[passwordField])}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={this.togglePasswordVisibility}
                    style={{
                      color: 'black',
                      width: '28px',
                      height: '28px'
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
    const {authType, initialAuthType} = this.props
    const disabled = Object.values(this.state.errors).some(error => error !== null)
    return (
      <FormContainer onSubmit={this.onSubmit}>
        <FormContent formType={AUTH_TYPE.signUp} authType={authType} initialAuthType={initialAuthType}>
          {this.renderInputs()}
          <SubmitButton disabled={disabled} testId='sign-up-submit-button'>Sign Up</SubmitButton>
        </FormContent>
        <FormContent formType={AUTH_TYPE.signIn} authType={authType} initialAuthType={initialAuthType}>
          {this.renderInputs({isSignUp: false})}
          <ForgotPasswordLink />
          <SubmitButton disabled={disabled} testId='sign-in-submit-button'>Sign In</SubmitButton>
        </FormContent>
      </FormContainer>
    )
  }
}
