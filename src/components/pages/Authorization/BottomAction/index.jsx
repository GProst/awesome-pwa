import React from 'react'
import PropTypes from 'prop-types'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import Transition from 'react-transition-group/Transition'

import {Action} from './Action'
import {AUTH_TYPE} from '../stateAuthPage'

export class BottomAction extends React.Component {
  static displayName = 'BottomAction'

  static propTypes = {
    className: PropTypes.string,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired
  }

  state = {
    height: 'auto',
    actionView: this.props.authType
  }

  toggleAction = () => {
    this.setState({
      actionView: this.state.actionView === AUTH_TYPE.signUp ? AUTH_TYPE.signIn : AUTH_TYPE.signUp
    })
  }

  onTransitionEnd = () => {
    this.setState({
      height: 'auto'
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.authType !== nextProps.authType) {
      this.setState({
        height: this.container.offsetHeight
      })
    }
  }

  render() {
    const {className, authType} = this.props
    const {actionView} = this.state
    return (
      <div ref={(elem) => { this.container = elem }} className={className} style={{height: this.state.height}}>
        <TransitionGroup>
          {actionView === AUTH_TYPE.signUp && (
            <Transition timeout={{enter: 125, exit: 0}} key='signUp'>
              {(status) => (
                <Action
                  desc='Already have an account?'
                  linkText='Sign In'
                  toAuthType={AUTH_TYPE.signIn}
                  authType={authType}
                  transitionStatus={status}
                  toggleAction={this.toggleAction}
                  onTransitionEnd={this.onTransitionEnd}
                />
              )}
            </Transition>
          )}
          {actionView === AUTH_TYPE.signIn && (
            <Transition timeout={{enter: 125, exit: 0}} key='signIn'>
              {(status) => (
                <Action
                  desc='Don’t have an account?'
                  linkText='Sign Up'
                  toAuthType={AUTH_TYPE.signUp}
                  authType={authType}
                  transitionStatus={status}
                  toggleAction={this.toggleAction}
                  onTransitionEnd={this.onTransitionEnd}
                />
              )}
            </Transition>
          )}
        </TransitionGroup>
      </div>
    )
  }
}
