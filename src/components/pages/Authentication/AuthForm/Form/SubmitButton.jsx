import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

const commonButtonStyles = {
  marginTop: '15px',
  color: 'white!important',
  backgroundColor: '#1DE9B6!important'
}

const styles = {
  root: {
    ...commonButtonStyles
  },
  raisedPrimary: {
    ...commonButtonStyles
  },
  disabled: {
    ...commonButtonStyles,
    color: 'rgba(0, 0, 0, 0.26)!important',
    backgroundColor: 'rgba(0, 0, 0, 0.12)!important'
  }
}

class _SubmitButton extends React.Component {
  static displayName = 'SubmitButton'

  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    testId: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    disabled: false
  }

  render() {
    return (
      <Button
        disabled={this.props.disabled}
        fullWidth
        color='primary'
        size='small'
        variant='raised'
        type='submit'
        classes={{...this.props.classes}}
        data-test-id={this.props.testId}
      >
        {this.props.children}
      </Button>
    )
  }
}

export const SubmitButton = withStyles(styles)(_SubmitButton)
