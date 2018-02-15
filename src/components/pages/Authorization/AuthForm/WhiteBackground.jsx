import React from 'react'
import styled from 'styled-components'

export const paddingVertical = 38 // in pixels

const Container = styled.div`
  background: white;
  position: absolute;
  top: ${paddingVertical}px;
  left: 0;
  width: 100%;
  height: calc(100% - ${paddingVertical * 2}px);
  box-sizing: border-box;
`

const Rounded = styled.div`
  border-radius: 19px;
  background: white;
  height: ${paddingVertical * 2}px;
  width: 100%;
  position: absolute;
  ${props => props.onTop ? 'top' : 'bottom'}: -${paddingVertical}px;
`

export class WhiteBackground extends React.Component {
  static displayName = 'WhiteBackground'

  render() {
    return (
      <Container>
        <Rounded onTop />
        <Rounded />
      </Container>
    )
  }
}
