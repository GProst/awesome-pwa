import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import {OnceMounted} from '../../../reusable/OnceMounted'
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
      <div ref={elem => { this.container = elem }} className={className} style={{height: this.state.height}}>
        <OnceMounted>
          {onceMounted => (
            <Fragment>
              {actionView === AUTH_TYPE.signUp && (
                <Action
                  key='signUp'
                  desc='Already have an account?'
                  linkText='Sign In'
                  toAuthType={AUTH_TYPE.signIn}
                  authType={authType}
                  toggleAction={this.toggleAction}
                  onTransitionEnd={this.onTransitionEnd}
                  onceMounted={onceMounted}
                />
              )}
              {actionView === AUTH_TYPE.signIn && (
                <Action
                  key='signIn'
                  desc='Don’t have an account?'
                  linkText='Sign Up'
                  toAuthType={AUTH_TYPE.signUp}
                  authType={authType}
                  toggleAction={this.toggleAction}
                  onTransitionEnd={this.onTransitionEnd}
                  onceMounted={onceMounted}
                />
              )}
            </Fragment>
          )}
        </OnceMounted>
      </div>
    )
  }
}
