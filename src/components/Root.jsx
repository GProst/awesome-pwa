import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import {store} from '../redux/store'
import {history} from '../history'
import {Routes} from '../routes'

import {GoalsPage} from './pages/Goals'
import {AuthPage} from './pages/Authorization'

import {AppBackground} from './global/AppBackground'

class Root extends React.Component {
  static displayName = 'Root'

  renderDevToolsComp() {
    const DevTools = process.env.NODE_ENV === 'production' ? () => null : require('../redux/DevTools').DevTools
    return <DevTools />
  }

  render() {
    return (
      <Provider store={store}>
        <AppBackground>
          {this.renderDevToolsComp()}
          <ConnectedRouter history={history} store={store}>
            <Switch>
              <Route exact path={Routes.goals} component={GoalsPage} />
              <Route exact path={Routes.authorization} component={AuthPage} />
              <Redirect to={Routes.goals} />
            </Switch>
          </ConnectedRouter>
        </AppBackground>
      </Provider>
    )
  }
}

export {
  Root
}
