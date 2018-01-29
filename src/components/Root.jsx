import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import './styles'
import '../font'

import ErrorHandler from './services/ErrorHandler/index'

import store from '../redux/store'
import history from '../history'
import {Routes} from '../routes'

import Goals from './pages/Goals'
import Auth from './pages/Authorization/index'

class Root extends React.Component {
  renderDevToolsComp() {
    const DevTools = process.env.NODE_ENV === 'production' ? () => null : require('../redux/DevTools').default
    return <DevTools />
  }

  render() {
    return (
      <Provider store={store}>
        <ErrorHandler>
          {this.renderDevToolsComp()}
          <ConnectedRouter history={history} store={store}>
            <Switch>
              <Route exact path={Routes.goals} component={Goals} />
              <Route exact path={Routes.authorization} component={Auth} />
              <Redirect to={Routes.goals} />
            </Switch>
          </ConnectedRouter>
        </ErrorHandler>
      </Provider>
    )
  }
}

export default Root
