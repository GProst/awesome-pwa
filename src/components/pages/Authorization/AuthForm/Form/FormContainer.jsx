import React from 'react'
import PropTypes from 'prop-types'
import Animated from 'animated/lib/targets/react-dom'

import {AUTH_TYPE} from '../../stateAuthPage'
import {easeIn, easeOut} from '../../../../../constants/animation'
import {baseDuration} from '../../animAuthPage'

const duration = baseDuration / 2

export class FormContainer extends React.Component {
  static displayName = 'FormContainer'

  static propTypes = {
    children: PropTypes.node.isRequired,
    onceMounted: PropTypes.bool.isRequired,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    formType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    toggleView: PropTypes.func.isRequired
  }

  state = {
    animClipPath: new Animated.Value(1)
  }

  componentWillMount() {
    if (this.props.onceMounted) {
      const {animClipPath} = this.state
      animClipPath.setValue(0)
      Animated.timing(animClipPath, {toValue: 1, duration, easing: easeIn})
        .start()
    }
  }

  componentWillReceiveProps(nextProps) {
    const {formType, authType} = this.props
    if (authType !== nextProps.authType) {
      if (formType !== nextProps.authType) { // if we need to switch to another authType
        Animated.timing(this.state.animClipPath, {toValue: 0, duration, easing: easeOut})
          .start(({finished}) => {
            if (finished) {
              this.props.toggleView()
            }
          })
      } else { // if switch was cancelled and we need to return to the state of current authType
        Animated.timing(this.state.animClipPath, {toValue: 1, duration, easing: easeOut}).start()
      }
    }
  }

  render() {
    return (
      <Animated.div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          clipPath: this.state.animClipPath.interpolate({
            inputRange: [0, 1],
            outputRange: ['circle(0px at center)', 'circle(240px at center)']
          })
        }}
      >
        {this.props.children}
      </Animated.div>
    )
  }
}
