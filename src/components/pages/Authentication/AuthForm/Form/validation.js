const defaultValidationState = {
  status: true,
  error: null
}

export const validateEmail = value => {
  const validation = {...defaultValidationState}
  if (value.length === 0) {
    validation.status = false
    validation.error = 'Please provide your email'
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(value)) {
    validation.status = false
    validation.error = 'Email is not correct'
  }
  return validation
}

export const validateName = value => {
  const validation = {...defaultValidationState}
  if (value.length === 0) {
    validation.status = false
    validation.error = 'Please provide your name'
  } else if (value.length > 200) {
    validation.status = false
    validation.error = 'Name is too long'
  }
  return validation
}

export const validateNewPassword = value => {
  const validation = {...defaultValidationState}
  if (value.length === 0) {
    validation.status = false
    validation.error = 'Please provide your passport'
  }
  // TODO
  return validation
}

export const validatePassword = value => {
  const validation = {...defaultValidationState}
  if (value.length === 0) {
    validation.status = false
    validation.error = 'Please provide your passport'
  }
  return validation
}
