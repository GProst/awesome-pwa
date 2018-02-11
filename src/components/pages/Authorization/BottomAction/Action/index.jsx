import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link as _Link} from 'react-router-dom'
import Animated from 'animated/lib/targets/react-dom'

import {AUTH_TYPE} from '../../stateAuthPage'
import {baseDuration} from '../../animAuthPage'
import {easeIn, easeOut} from '../../../../../constants/animation'

const enterDuration = baseDuration
const leaveDuration = baseDuration / 2

const Desc = styled.span`
  font-size: 14px;
  color: white;
  line-height: 24px;
`

const Link = styled(_Link)`
  font-size: 16px;
  color: #64FFDA;
  font-weight: bold;
  background: none;
  border: none;
  outline: none;
  text-decoration: none;
`

export class Action extends React.Component {
  static displayName = 'Action'

  static propTypes = {
    desc: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    toAuthType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    transitionStatus: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited']).isRequired,
    toggleAction: PropTypes.func.isRequired,
    onTransitionEnd: PropTypes.func.isRequired
  }

  state = {
    animOpacity: new Animated.Value(1)
  }

  componentWillMount() {
    if (this.props.transitionStatus !== 'entered') {
      const {animOpacity} = this.state
      animOpacity.setValue(0)
      Animated.sequence([
        Animated.delay(baseDuration),
        Animated.timing(animOpacity, {toValue: 1, duration: enterDuration, easing: easeIn})
      ])
        .start(({finished}) => {
          if (finished) {
            this.props.onTransitionEnd()
          }
        })
    }
  }

  componentWillReceiveProps(nextProps) {
    const {toAuthType, authType} = this.props
    if (authType !== nextProps.authType) {
      if (toAuthType === nextProps.authType) { // if we need to switch to another authType
        Animated.timing(this.state.animOpacity, {toValue: 0, duration: leaveDuration, easing: easeOut})
          .start(({finished}) => {
            if (finished) {
              this.props.toggleAction()
            }
          })
      } else { // if switch was cancelled and we need to return to the state of current authType
        Animated.timing(this.state.animOpacity, {toValue: 1, duration: leaveDuration, easing: easeOut}).start()
      }
    }
  }

  render() {
    const {desc, linkText, toAuthType} = this.props
    return (
      <Animated.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: this.state.animOpacity
        }}
      >
        <Desc>{desc}</Desc>
        <Link to={`/authorization?authType=${toAuthType}`}>
          {linkText}
        </Link>
      </Animated.div>
    )
  }
}
