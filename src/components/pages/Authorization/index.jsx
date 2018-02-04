import React from 'react'

import {requireNoAuth} from '../../../hocs/requireNoAuth'

import {AuthPageView} from './view'

class AuthPageController extends React.Component {
  static displayName = 'AuthPageController'

  render() {
    return (
      <AuthPageView />
    )
  }
}

const AuthPageGuarded = requireNoAuth(AuthPageController)

export {
  AuthPageGuarded as AuthPage
}
