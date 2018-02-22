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
import {validateEmail, validateName, validateNewPassword, validatePassword} from './validation'

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

export class Form extends React.Component {
  static displayName = 'Form'

  static propTypes = {
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    setFormNode: PropTypes.func.isRequired,
    animating: PropTypes.bool.isRequired
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
      [FIELD.name]: null,
      [FIELD.email]: null,
      [FIELD.password]: null,
      [FIELD.newPassword]: null
    }
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
        validationState = validateNewPassword(value)
        break
      }
      case FIELD.password: {
        validationState = validatePassword(value)
        break
      }
    }
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

  componentWillReceiveProps(nextProps) {
    if (this.props.authType !== nextProps.authType) {
      this.setState({
        fields: {
          ...this.state.fields,
          [FIELD.password]: '',
          [FIELD.newPassword]: ''
        },
        errors: {
          ...this.state.errors,
          [FIELD.password]: null,
          [FIELD.newPassword]: null
        }
      })
    }
  }

  renderInputs({isSignUp = true} = {}) {
    const {fields, errors} = this.state
    const passportField = this.props.authType === AUTH_TYPE.signIn ? FIELD.password : FIELD.newPassword
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
              onBlur={e => { this.onInputBlur(FIELD.name, e) }}
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
            onBlur={e => { this.onInputBlur(FIELD.email, e) }}
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
            value={fields[passportField]}
            onChange={e => { this.onInputChange(passportField, e) }}
            onBlur={e => { this.onInputBlur(passportField, e) }}
            type={this.state.showPassword ? 'text' : 'password'}
            label='Password'
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            helperText={errors[passportField] || ' '}
            error={Boolean(errors[passportField])}
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
          <SubmitButton onClick={this.onSubmit}>Sign Up</SubmitButton>
        </FormContainer>
        <FormContainer setFormNode={setFormNode} formType={AUTH_TYPE.signIn} authType={authType} animating={animating}>
          {this.renderInputs({isSignUp: false})}
          <ForgotPasswordLink />
          <SubmitButton onClick={this.onSubmit}>Sign In</SubmitButton>
        </FormContainer>
      </Fragment>
    )
  }
}
