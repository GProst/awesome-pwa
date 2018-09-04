import React from 'react'
import PropTypes from 'prop-types'
import Animated from 'animated/lib/targets/react-dom'

import {AUTH_TYPE} from '../../constants/index'
import {animState} from '../../animations/switchAuthType'
import {formLayoutHelper} from '../../helpers/formLayoutHelper'

export class FormContent extends React.Component {
  static displayName = 'FormContent'

  static propTypes = {
    children: PropTypes.node.isRequired,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    initialAuthType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    formType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authType !== state.authType) {
      return {
        authType: props.authType,
        inactive: props.authType !== state.formType
      }
    }
    return null
  }

  state = {
    animValue: this.props.formType === AUTH_TYPE.signIn ? animState.signInForm : animState.signUpForm,
    position: this.props.initialAuthType === this.props.formType ? 'relative' : 'absolute',
    authType: null,
    formType: this.props.formType
  }

  componentDidMount() {
    formLayoutHelper.setFormNode({node: this.animContainer.refs.node, type: this.state.formType})
    const onResize = () => {
      // I think we do it just in case, no harm here I think
      this.setState({position: this.props.authType === this.state.formType ? 'relative' : 'absolute'})
    }
    window.addEventListener('resize', onResize)
  }

  render() {
    const {position, inactive} = this.state
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
