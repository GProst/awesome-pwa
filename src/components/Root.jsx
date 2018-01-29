import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import './styles'
import '../font'

import {ThemeProvider} from '../theme'
import ErrorHandler from './services/ErrorHandler/index'

import store from '../redux/store'
import history from '../history'
import {Routes} from '../routes'

import Main from './pages/Main'
import Login from './pages/Authorization/index'
import Loader from './pages/Loader/index'
import PostList from './pages/PostList'

class Root extends React.Component {
  renderDevToolsComp() {
    const DevTools = process.env.NODE_ENV === 'production' ? () => null : require('../redux/DevTools').default
    return <DevTools />
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <ErrorHandler>
            {this.renderDevToolsComp()}
            <ConnectedRouter history={history} store={store}>
              <Switch>
                <Route exact path={Routes.main} component={Main} />
                <Route exact path={Routes.authorization} component={Login} />
                <Route exact path={Routes.fetchingProfileData} component={Loader} />
                <Route exact path={Routes.postList} component={PostList} />
                <Redirect to={Routes.main} />
              </Switch>
            </ConnectedRouter>
          </ErrorHandler>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default Root
