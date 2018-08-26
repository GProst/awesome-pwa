import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link as _Link} from 'react-router-dom'
import Animated from 'animated/lib/targets/react-dom'

import {AUTH_TYPE} from '../stateAuthPage'
import {animState} from '../animations/switchAuthType'
import {ROUTES} from '../../../../routes'

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

  static getDerivedStateFromProps(props, state) {
    if (props.authType !== state.authType) {
      return {
        authType: props.authType,
        inactive: props.authType === state.toAuthType
      }
    }
    return null
  }

  state = {
    position: this.props.authType === this.props.toAuthType ? 'absolute' : 'relative',
    animValue: this.props.toAuthType === AUTH_TYPE.signIn ? animState.toSignInAction : animState.toSignUpAction,
    authType: null,
    toAuthType: this.props.toAuthType
  }

  componentDidMount() {
    const onResize = () => {
      this.setState({position: this.props.authType === this.state.toAuthType ? 'absolute' : 'relative'})
    }
    window.addEventListener('resize', onResize)
  }

  render() {
    const {desc, linkText} = this.props
    const {position, inactive, animValue, toAuthType} = this.state
    return (
      <Animated.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          top: 0,
          position,
          pointerEvents: inactive ? 'none' : 'initial',
          opacity: animValue
        }}
      >
        <Desc>{desc}</Desc>
        <Link to={`${ROUTES.authentication}?authType=${toAuthType}`}>
          {linkText}
        </Link>
      </Animated.div>
    )
  }
}
