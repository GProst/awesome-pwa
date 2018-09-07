import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import {store} from '../redux/store'
import {history} from '../history'
import {ROUTES} from '../routes'
import {logger} from '../utils/logger'
import {ThemeProvider} from './global/ThemeProvider'

import {GoalsPage} from './pages/Goals'
import {AuthPage} from './pages/Authentication'

import {AppBackground} from './global/AppBackground'

class Root extends React.Component {
  static displayName = 'Root'

  state = {
    error: ''
  }

  componentDidCatch(error, info) {
    logger.errorRemote(error, {extra: info})
    this.setState({
      error
    })
  }

  render() {
    if (this.state.error) {
      return ( // TODO
        <AppBackground>
          Error! Reload the app!
        </AppBackground>
      )
    }

    return (
      <Provider store={store}>
        <ThemeProvider>
          <AppBackground>
            <ConnectedRouter history={history} store={store}>
              <Switch>
                <Route exact strict path={ROUTES.goals} component={GoalsPage} />
                <Route exact strict path={ROUTES.authentication} component={AuthPage} />
                <Redirect to={ROUTES.main} />
              </Switch>
            </ConnectedRouter>
          </AppBackground>
        </ThemeProvider>
      </Provider>
    )
  }
}

if (process.env.NODE_ENV !== 'production') {
  const {hot} = require('react-hot-loader')
  Root = hot(module)(Root) // eslint-disable-line no-class-assign
}

export {
  Root
}
