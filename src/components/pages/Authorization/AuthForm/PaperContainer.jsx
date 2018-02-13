import React from 'react'
import PropTypes from 'prop-types'
import Animated from 'animated/lib/targets/react-dom'
import styled from 'styled-components'

import {AUTH_TYPE} from '../stateAuthPage'
import {animState} from '../animationsAuthPage'

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
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  state = {
    height: 'auto'
  }

  componentWillMount() {
    animState.paperContainer.setValue(
      this.props.authType === AUTH_TYPE.signUp ? 1 : 0
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animating !== nextProps.animating) {
      this.setState({height: nextProps.animating ? null : 'auto'})
    }
  }

  render() {
    const heightInterpolation = animState.paperContainer.interpolate({
      inputRange: [0, 1],
      outputRange: [288, 347] // TODO: remove hardcoding
    })

    return (
      <Animated.div
        style={{
          background: 'white',
          borderRadius: '19px',
          padding: '38px 36px',
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
      >
        <InnerContainer>
          {this.props.children}
        </InnerContainer>
      </Animated.div>
    )
  }
}
