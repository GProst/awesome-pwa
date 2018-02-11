import React from 'react'
import PropTypes from 'prop-types'
import Animated from 'animated/lib/targets/react-dom'

import {AUTH_TYPE} from '../../StateAuthPage'

export class FormContainer extends React.Component {
  static displayName = 'FormContainer'

  static propTypes = {
    children: PropTypes.node.isRequired,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  state = {
    animHeight: 'auto'
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.authType !== nextProps.authType) {
      const container = this.animContainer.refs.node
      const currentHeight = container.offsetHeight
      this.setState({
        animHeight: new Animated.Value(currentHeight)
      }, () => {
        const inputHeight = 59 // TODO: no hardcoding
        const nextHeight = nextProps.authType === AUTH_TYPE.signUp
          ? currentHeight + inputHeight
          : currentHeight - inputHeight
        Animated.timing(this.state.animHeight, {toValue: nextHeight})
          .start(() => {
            this.setState({
              animHeight: 'auto'
            })
          })
      })
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
