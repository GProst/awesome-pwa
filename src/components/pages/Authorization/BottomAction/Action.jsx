import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link as _Link} from 'react-router-dom'
import Animated from 'animated/lib/targets/react-dom'

import {AUTH_TYPE} from '../stateAuthPage'
import {animState} from '../animationsAuthPage'

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
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  state = {
    position: 'relative',
    animValue: this.props.toAuthType === AUTH_TYPE.signIn ? animState.toSignInAction : animState.toSignUpAction
  }

  _setCSSAttributes(props) {
    this.setState({
      position: props.authType === props.toAuthType ? 'absolute' : 'relative',
      pointerEvents: props.authType === props.toAuthType ? 'none' : 'initial'
    })
  }

  componentWillMount() {
    this.state.animValue.setValue(
      this.props.authType === this.props.toAuthType ? 0 : 1
    )
    this._setCSSAttributes(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authType !== this.props.authType) {
      this._setCSSAttributes(nextProps)
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
          whiteSpace: 'nowrap',
          top: 0,
          position: this.state.position,
          pointerEvents: this.state.pointerEvents,
          opacity: this.state.animValue
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
