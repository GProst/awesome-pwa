import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import Button from '@material-ui/core/Button'

import {store} from '../redux/store'
import {history} from '../history'
import {ROUTES} from '../routes'
import {logger} from '../utils/logger'
import {ThemeProvider} from './global/ThemeProvider'

import {GoalsPage} from './pages/Goals'
import {AuthPage} from './pages/Authentication'

export class Root extends React.Component {
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
      return ( // TODO: "Reload the app or Reinstall the app"
        <>
          Error!
          <Button onClick={() => { window.location.href = window.location.origin }} data-test-id='reload-app-button'>
            Reload the app!
          </Button>
        </>
      )
    }

    return (
      <Provider store={store}>
        <ThemeProvider>
          <ConnectedRouter history={history} store={store}>
            <Switch>
              <Route exact strict path={ROUTES.goals} component={GoalsPage} />
              <Route exact strict path={ROUTES.authentication} component={AuthPage} />
              <Redirect to={ROUTES.main} />
            </Switch>
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    )
  }
}
