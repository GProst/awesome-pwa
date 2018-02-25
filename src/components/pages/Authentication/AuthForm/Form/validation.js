const defaultValidationState = {
  status: true,
  error: null
}

export const validateEmail = value => {
  const validation = {...defaultValidationState}
  switch (true) {
    case value.length === 0: {
      validation.status = false
      validation.error = 'Please provide your email'
      break
    }
    case !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(value): {
      validation.status = false
      validation.error = 'Email is not correct'
      break
    }
  }
  return validation
}

export const validateName = value => {
  const validation = {...defaultValidationState}
  switch (true) {
    case value.length === 0: {
      validation.status = false
      validation.error = 'Please provide your name'
      break
    }
    case /^_*[0-9]*$/.test(value): {
      validation.status = false
      validation.error = 'Username must contain letters'
      break
    }
    case value.length > 200: {
      validation.status = false
      validation.error = 'Name is too long'
      break
    }
  }
  return validation
}

export const validateNewPassword = value => {
  const validation = {...defaultValidationState}
  switch (true) {
    case value.length === 0: {
      validation.status = false
      validation.error = 'Please provide your password'
      break
    }
    case value.length < 8: {
      validation.status = false
      validation.error = 'Password must contain at least 8 characters'
      break
    }
    case !/[0-9]/.test(value): {
      validation.status = false
      validation.error = 'Password must contain at least one number'
      break
    }
    case /^[0-9]+$/.test(value): {
      validation.status = false
      validation.error = 'Password must contain at least one not numeric character'
      break
    }
  }
  return validation
}

export const validatePassword = value => {
  const validation = {...defaultValidationState}
  if (value.length === 0) {
    validation.status = false
    validation.error = 'Please provide your password'
  }
  return validation
}
