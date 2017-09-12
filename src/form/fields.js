import PropTypes from 'prop-types'

export const FieldTypes = {
  email: 0,
  password: 1,
  other: 2
}

export const FieldShape = PropTypes.shape({
  value: PropTypes.string,
  type: PropTypes.oneOf(Object.values(FieldTypes)).isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string
})
