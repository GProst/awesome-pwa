import _isUndefined from 'lodash-es/isUndefined'

import {FieldTypes} from '../fields'
import {EmailErrorTypes, isValidEmail} from './email'

const fieldTypesAsArr = Object.values(FieldTypes)

const ErrorTypes = {
  generic: {
    required: 'generic/0'
  },
  [FieldTypes.email]: EmailErrorTypes
}

const checkFieldProps = (field) => {
  const {value, type, required} = field

  if (_isUndefined(value) || value === null) {
    throw new Error('\'value\' field is required')
  } else if (typeof value !== 'string') {
    throw new Error('\'value\' field should be string')
  }

  if (_isUndefined(type) || type === null) {
    throw new Error('\'type\' field is required')
  } else if (!fieldTypesAsArr.includes(type)) {
    throw new Error(`'type' field value must be one of [${fieldTypesAsArr.join(', ')}]`)
  }

  if (required && typeof required !== 'boolean') {
    throw new Error('\'required\' field must be Boolean')
  }
}

const isValidField = (field) => {
  checkFieldProps(field)

  let isValid = {
    status: true,
    error: null
  }

  const {type, required, value} = field

  if (required && !value) {
    isValid.status = false
    isValid.error = ErrorTypes.generic.required
  } else {
    switch (type) {
      case FieldTypes.email:
        isValid = isValidEmail(value)
    }
  }

  return isValid
}

export {
  isValidField,
  ErrorTypes
}
