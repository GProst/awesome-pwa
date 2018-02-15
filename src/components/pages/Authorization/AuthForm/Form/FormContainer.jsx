import React from 'react'
import PropTypes from 'prop-types'
import Animated from 'animated/lib/targets/react-dom'

import {AUTH_TYPE} from '../../stateAuthPage'
import {animState} from '../../animationsAuthPage'

export class FormContainer extends React.Component {
  static displayName = 'FormContainer'

  static propTypes = {
    children: PropTypes.node.isRequired,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    animating: PropTypes.bool.isRequired,
    setFormNode: PropTypes.func.isRequired,
    formType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  state = {
    animValue: this.props.formType === AUTH_TYPE.signIn ? animState.signInFrom : animState.signUpForm,
    position: 'relative'
  }

  componentWillMount() {
    this.state.animValue.setValue(
      this.props.authType === this.props.formType ? 1 : 0
    )
    this.setState({
      position: this.props.authType === this.props.formType ? 'relative' : 'absolute',
      inactive: this.props.authType !== this.props.formType
    })
  }

  componentDidMount() {
    this.props.setFormNode({node: this.animContainer.refs.node, type: this.props.formType})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authType !== this.props.authType) {
      this.setState({
        inactive: nextProps.authType !== this.props.formType
      })
    }
  }

  render() {
    const {position, inactive} = this.state
    const {animating} = this.props
    const clipPathInterpolation = this.state.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['circle(0px at center)', 'circle(240px at center)']
    })
    return (
      <Animated.div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          position,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: inactive ? 'none' : 'initial',
          clipPath: (animating || inactive) ? clipPathInterpolation : undefined, // this is a fix for flickering on Android: show clipPath only when animating or when not active
          WebkitClipPath: (animating || inactive) ? clipPathInterpolation : undefined
        }}
        ref={elem => { this.animContainer = elem }}
      >
        {this.props.children}
      </Animated.div>
    )
  }
}
