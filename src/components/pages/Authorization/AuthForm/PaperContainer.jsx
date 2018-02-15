import React from 'react'
import PropTypes from 'prop-types'
import Animated from 'animated/lib/targets/react-dom'
import styled from 'styled-components'

import {AUTH_TYPE} from '../stateAuthPage'
import {animState} from '../animationsAuthPage'

import {WhiteBackground, paddingVertical} from './WhiteBackground'

const InnerContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export class PaperContainer extends React.Component {
  static displayName = 'PaperContainer'

  static propTypes = {
    children: PropTypes.node.isRequired,
    animating: PropTypes.bool.isRequired,
    getFormHeight: PropTypes.func.isRequired,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  state = {
    height: 'auto',
    signInFormHeight: 0,
    signUpFormHeight: 1
  }

  componentWillMount() {
    animState.paperContainer.setValue(
      this.props.authType === AUTH_TYPE.signUp ? 1 : 0
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authType !== this.props.authType) {
      const container = this.animContainer.refs.node
      const {paddingTop, paddingBottom} = window.getComputedStyle(container)
      const verticalPadding = parseFloat(paddingTop, 10) + parseFloat(paddingBottom, 10)
      this.setState({
        signInFormHeight: this.props.getFormHeight({type: AUTH_TYPE.signIn}) + verticalPadding,
        signUpFormHeight: this.props.getFormHeight({type: AUTH_TYPE.signUp}) + verticalPadding
      })
    }
    if (this.props.animating !== nextProps.animating) {
      this.setState({height: nextProps.animating ? null : 'auto'})
    }
  }

  render() {
    const heightInterpolation = animState.paperContainer.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.signInFormHeight, this.state.signUpFormHeight]
    })

    return (
      <Animated.div
        style={{
          background: 'transparent',
          padding: `${paddingVertical}px 36px`,
          width: '85vw',
          maxWidth: '360px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          height: this.state.height || heightInterpolation
        }}
        ref={elem => { this.animContainer = elem }}
      >
        <WhiteBackground />
        <InnerContainer>
          {this.props.children}
        </InnerContainer>
      </Animated.div>
    )
  }
}
