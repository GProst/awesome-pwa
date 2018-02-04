import React from 'react'
import {Provider} from 'unstated'

import {requireNoAuth} from '../../../hocs/requireNoAuth'

import {AuthPageView} from './view'
import {AuthPageStateContainer} from './state'

class AuthPageController extends React.Component {
  static displayName = 'AuthPageController'

  render() {
    return (
      <Provider inject={[new AuthPageStateContainer()]}>
        <AuthPageView />
      </Provider>
    )
  }
}

const AuthPageGuarded = requireNoAuth(AuthPageController)

export {
  AuthPageGuarded as AuthPage
}
