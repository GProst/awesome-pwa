import React from 'react'

import {requireNoAuth} from '../../../hocs/requireNoAuth'

import {AuthPageView} from './view'
import {AUTH_TYPE} from './constants'

class AuthPageController extends React.Component {
  static displayName = 'AuthPageController'

  state = {
    authType: AUTH_TYPE.signUp
  }

  switchAuthType = () => {
    this.setState({
      authType: this.state.authType === AUTH_TYPE.signUp ? AUTH_TYPE.signIn : AUTH_TYPE.signUp
    })
  }

  render() {
    return (
      <AuthPageView authType={this.state.authType} switchAuthType={this.switchAuthType} />
    )
  }
}

const AuthPageGuarded = requireNoAuth(AuthPageController)

export {
  AuthPageGuarded as AuthPage
}
