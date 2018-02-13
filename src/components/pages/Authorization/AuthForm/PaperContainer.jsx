import React from 'react'
import PropTypes from 'prop-types'
import Animated from 'animated/lib/targets/react-dom'
import styled from 'styled-components'

import {AUTH_TYPE} from '../stateAuthPage'
import {baseDuration} from '../animationsAuthPage'
import {easeOut} from '../../../../constants/animation'

const duration = baseDuration

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
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  state = {
    animHeight: 'auto',
    animating: false,
    prevHeight: null
  }

  _startAnimation(nextHeight) {
    if (!this.state.animating) this.setState({animating: true})
    Animated.timing(this.state.animHeight, {
      toValue: nextHeight,
      easing: easeOut,
      duration
    })
      .start(({finished}) => {
        if (finished) {
          // I do it in case if form animation will over little bit faster (and it uses position: absolute)
          setTimeout(() => {
            if (this.state.animating) {
              this.setState({
                animating: false,
                animHeight: 'auto'
              })
            }
          }, 50)
        }
      })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.authType !== nextProps.authType) {
      if (!this.state.animating) {
        const container = this.animContainer.refs.node
        const prevHeight = container.offsetHeight
        this.setState({
          prevHeight,
          animHeight: new Animated.Value(prevHeight)
        }, () => {
          const inputHeight = 59 // TODO: no hardcoding
          const nextHeight = nextProps.authType === AUTH_TYPE.signUp
            ? prevHeight + inputHeight
            : prevHeight - inputHeight
          this._startAnimation(nextHeight)
        })
      } else {
        this._startAnimation(this.state.prevHeight)
      }
    }
  }

  render() {
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
          height: this.state.animHeight
        }}
        ref={elem => { this.animContainer = elem }}
      >
        <InnerContainer>
          {this.props.children}
        </InnerContainer>
      </Animated.div>
    )
  }
}
