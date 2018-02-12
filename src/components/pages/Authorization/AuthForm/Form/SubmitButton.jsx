import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'

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
    children: PropTypes.node.isRequired
  }

  render() {
    return (
      <Button fullWidth color='primary' size='small' variant='raised' type='button' classes={{...this.props.classes}}>
        {this.props.children}
      </Button>
    )
  }
}

export const SubmitButton = withStyles(styles)(_SubmitButton)
