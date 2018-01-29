import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import _capitalize from 'lodash-es/capitalize'

import {Routes} from '../../../routes'

import requireNoAuth from '../../../hocs/requireNoAuth'

import {FieldTypes, isValidField, ErrorTypes} from '../../../form/index'
import {login} from '../../../redux/genericActions/api/index'
import {setError} from '../../../redux/reducers/error'

import AuthPageTemplate from './template'

const connector = connect(
  (state) => ({
    location: state.router.location
  }),
  (dispatch) => ({
    login() {
      return dispatch(login())
    },
    push(path) {
      dispatch(push(path))
    },
    setError(error) {
      dispatch(setError(error))
    }
  })
)

class AuthPage extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        redirect: PropTypes.string.isRequired
      })
    }).isRequired,
    setError: PropTypes.func.isRequired
  }

  state = {
    form: {
      email: {
        required: true,
        value: '',
        type: FieldTypes.email,
        error: null,
        id: 'login-form-email'
      },
      password: {
        required: true,
        value: '',
        type: FieldTypes.password,
        error: null,
        id: 'login-form-password'
      }
    },
    loading: false
  }

  validateFields(fields) {
    const statuses = fields.reduce((statuses, field) => {
      statuses.push(this.getFieldValidationStatus(field))
      return statuses
    }, [])
    this.setFieldsValidationStatuses(statuses)
  }

  getFieldValidationStatus = (fieldName) => {
    const {form} = this.state
    const field = form[fieldName]

    let errorText = null
    const isValid = isValidField(field)

    if (!isValid.status) {
      const {error} = isValid

      switch (error) {
        case ErrorTypes.generic.required:
          errorText = `${_capitalize(fieldName)} field is required`
          break
        case ErrorTypes[FieldTypes.email].format:
          errorText = 'Please enter a valid email'
      }
    }

    return {
      fieldName,
      errorText
    }
  }

  setFieldsValidationStatuses(statuses) {
    const {form} = this.state
    const updatedFields = statuses.reduce((updatedFields, field) => {
      const {fieldName, errorText} = field
      const currentField = form[fieldName]
      return {
        ...updatedFields,
        [fieldName]: {
          ...currentField,
          error: errorText
        }
      }
    }, {})

    this.setState({
      form: {
        ...form,
        ...updatedFields
      }
    })
  }

  formIsValid(form) {
    return Object.values(form).reduce((isValid, field) => {
      return isValid && isValidField(field).status
    }, true)
  }

  onSubmit = (event) => {
    event.preventDefault()
    if (this.state.loading) return
    this.validateFields(Object.keys(this.state.form))

    if (this.formIsValid(this.state.form)) {
      this.setState({
        loading: true
      })

      this.props.login()
        .then(() => {
          const {state} = this.props.location
          if (state && state.redirect && state.redirect !== Routes.main) { // we will be automatically redirected to main route
            this.props.push(state.redirect)
          }
        })
        .catch((err) => {
          this.props.setError(err.message) // TODO: custom error message
          this.setState({
            loading: false
          })
          throw err
        })
    }
  }

  onInputChange = (fieldName, event) => {
    const {form} = this.state
    const {value} = event.target

    this.setState({
      form: {
        ...form,
        [fieldName]: {
          ...form[fieldName],
          value,
          error: null
        }
      }
    })
  }

  onInputBlur = (fieldName, event) => {
    const status = this.getFieldValidationStatus(fieldName)
    this.setFieldsValidationStatuses([status])
  }

  render() {
    const {form, loading} = this.state

    return (
      <AuthPageTemplate
        form={form}
        onSubmit={this.onSubmit}
        onInputChange={this.onInputChange}
        onInputBlur={this.onInputBlur}
        loading={loading}
      />
    )
  }
}

export default requireNoAuth(connector(AuthPage))
