import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import {store} from '../redux/store'
import {history} from '../history'
import {Routes} from '../routes'
import {ThemeProvider} from './global/ThemeProvider'

import {GoalsPage} from './pages/Goals'
import {AuthPage} from './pages/Authentication'

import {AppBackground} from './global/AppBackground'

class Root extends React.Component {
  static displayName = 'Root'

  renderDevToolsComp() {
    const DevTools = process.env.NODE_ENV === 'production' ? () => null : require('./global/DevTools').DevTools
    return <DevTools />
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <AppBackground>
            {this.renderDevToolsComp()}
            <ConnectedRouter history={history} store={store}>
              <Switch>
                <Route exact path={Routes.goals} component={GoalsPage} />
                <Route exact path={Routes.authentication} component={AuthPage} />
                <Redirect to={Routes.goals} />
              </Switch>
            </ConnectedRouter>
          </AppBackground>
        </ThemeProvider>
      </Provider>
    )
  }
}

export {
  Root
}
