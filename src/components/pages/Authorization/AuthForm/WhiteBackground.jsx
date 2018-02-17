import React from 'react'
import styled from 'styled-components'
import Animated from 'animated/lib/targets/react-dom'

import {animState} from '../animations/switchAuthType'

export const paddingVertical = 38 // in pixels

const Container = styled.div`
  position: absolute;
  top: ${paddingVertical}px;
  left: 0;
  width: 100%;
  height: calc(100% - ${paddingVertical * 2}px);
  box-sizing: border-box;
`

const Rounded = styled(({upper, ...props}) => <Animated.div {...props} />)`
  border-radius: 19px;
  background: white;
  height: ${paddingVertical * 2}px;
  width: 100%;
  position: absolute;
  ${props => props.upper ? 'top' : 'bottom'}: -${paddingVertical}px;
`

const Rect = styled(Animated.div)`
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export class WhiteBackground extends React.Component {
  static displayName = 'WhiteBackground'

  render() {
    return (
      <Container>
        <Rounded upper style={{
          transform: [{translateY: animState.whiteContainer.roundedTop}]
        }} />
        <Rect style={{
          transform: [{scaleY: animState.whiteContainer.rect}]
        }} />
        <Rounded style={{
          transform: [{translateY: animState.whiteContainer.roundedBottom}]
        }} />
      </Container>
    )
  }
}
