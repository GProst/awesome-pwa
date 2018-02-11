import React from 'react'
import PropTypes from 'prop-types'
import Animated from 'animated/lib/targets/react-dom'
import Easing from 'animated/lib/Easing'

import {AUTH_TYPE} from '../../StateAuthPage'
import {duration} from '../../animAuthPage'

export class FormContainer extends React.Component {
  static displayName = 'FormContainer'

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
      easing: Easing.bezier(0, 0, 0.58, 1),
      duration
    })
      .start(({finished}) => {
        if (finished) {
          this.setState({
            animating: false,
            animHeight: 'auto'
          })
        }
      })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.authType !== nextProps.authType) {
      const container = this.animContainer.refs.node
      if (!this.state.animating) {
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
          height: this.state.animHeight
        }}
        ref={(elem) => { this.animContainer = elem }}
      >
        {this.props.children}
      </Animated.div>
    )
  }
}
