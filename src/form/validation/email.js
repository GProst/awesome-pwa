import {FieldTypes} from '../fields'

const emailField = FieldTypes.email

export const EmailErrorTypes = {
  format: `${emailField}/0`
}

export const isValidEmail = (value) => {
  let status = true
  let error = null
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(value)) {
    status = false
    error = EmailErrorTypes.format
  }
  return {
    status,
    error
  }
}
