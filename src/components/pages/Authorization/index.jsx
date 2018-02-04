import React from 'react'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Provider} from 'unstated'

import {requireNoAuth} from '../../../hocs/requireNoAuth'

import {AuthPageView} from './view'
import {AuthPageStateContainer} from './state'

const authPageStateContainer = new AuthPageStateContainer()

const connector = connect(
  (state) => {
    const {authType} = queryString.parse(state.router.location.search)
    return {
      authType
    }
  }
)

class AuthPageController extends React.Component {
  static displayName = 'AuthPageController'

  static propTypes = {
    authType: PropTypes.string
  }

  _updateState(queryAuthType) {
    authPageStateContainer.setAuthType(queryAuthType)
  }

  componentWillMount() {
    this._updateState(this.props.authType)
  }

  componentWillReceiveProps(nextProps) {
    this._updateState(nextProps.authType)
  }

  render() {
    return (
      <Provider inject={[authPageStateContainer]}>
        <AuthPageView />
      </Provider>
    )
  }
}

const AuthPageGuarded = requireNoAuth(connector(AuthPageController))

export {
  AuthPageGuarded as AuthPage
}
