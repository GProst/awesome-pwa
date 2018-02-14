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
      pointerEvents: this.props.authType === this.props.formType ? 'initial' : 'none'
    })
  }

  componentDidMount() {
    this.props.setFormNode({node: this.animContainer.refs.node, type: this.props.formType})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authType !== this.props.authType) {
      this.setState({
        pointerEvents: nextProps.authType === this.props.formType ? 'initial' : 'none'
      })
    }
    if (this.props.animating !== nextProps.animating) {
      if (nextProps.animating) this.setState({position: 'absolute'})
      if (!nextProps.animating && this.props.authType === this.props.formType) this.setState({position: 'relative'})
    }
  }

  render() {
    const clipPathInterpolation = this.state.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['circle(0px at center)', 'circle(240px at center)']
    })
    return (
      <Animated.div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          position: this.state.position,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: this.state.pointerEvents,
          clipPath: clipPathInterpolation,
          WebkitClipPath: clipPathInterpolation
        }}
        ref={elem => { this.animContainer = elem }}
      >
        {this.props.children}
      </Animated.div>
    )
  }
}
