import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {WhiteBackground, paddingVertical} from './WhiteBackground'

const Container = styled.div`
  background: transparent;
  padding: ${paddingVertical}px 36px;
  width: 85vw;
  max-width: 360px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

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
    children: PropTypes.node.isRequired
  }

  render() {
    return (
      <Container>
        <WhiteBackground />
        <InnerContainer>
          {this.props.children}
        </InnerContainer>
      </Container>
    )
  }
}
