import React from 'react'
import PropTypes from 'prop-types'
import Animated from 'animated/lib/targets/react-dom'

import {AUTH_TYPE} from '../../stateAuthPage'
import {animState} from '../../animations/switchAuthType'

export class FormContent extends React.Component {
  static displayName = 'FormContent'

  static propTypes = {
    children: PropTypes.node.isRequired,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    animating: PropTypes.bool.isRequired,
    setFormNode: PropTypes.func.isRequired,
    formType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.authType !== prevState.authType) {
      let additionalState = {}
      if (prevState.authType !== null) {
        additionalState = {
          inactive: nextProps.authType !== prevState.formType
        }
      }
      return {
        authType: nextProps.authType,
        ...additionalState
      }
    }
    return null
  }

  state = {
    animValue: this.props.formType === AUTH_TYPE.signIn ? animState.signInForm : animState.signUpForm,
    position: this.props.authType === this.props.formType ? 'relative' : 'absolute',
    inactive: this.props.authType !== this.props.formType,
    authType: null,
    formType: this.props.formType
  }

  componentDidMount() {
    this.props.setFormNode({node: this.animContainer.refs.node, type: this.state.formType})
    const onResize = () => {
      this.setState({position: this.props.authType === this.state.formType ? 'relative' : 'absolute'})
    }
    window.addEventListener('resize', onResize)
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
