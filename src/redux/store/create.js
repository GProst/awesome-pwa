import {createStore as _createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {routerMiddleware, routerReducer} from 'react-router-redux'
import thunk from 'redux-thunk'

import history from '../../history'
import * as reducers from '../reducers/index'
import {getAuthInitialState} from '../reducers/auth/index'

export function createStore() {
  const middleware = [routerMiddleware(history), thunk]
  const toCompose = []

  if (process.env.NODE_ENV !== 'production') {
    const {logger} = require(`redux-logger`)
    const {DevTools} = require('../DevTools')
    middleware.push(logger)
    toCompose.push(DevTools.instrument())
  }

  toCompose.unshift(applyMiddleware(...middleware))
  let enhancer = compose(...toCompose)

  const store = _createStore(combineReducers({
    ...reducers,
    router: routerReducer
  }), {
    auth: getAuthInitialState()
  },
  enhancer
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(combineReducers({
        ...reducers,
        router: routerReducer
      }))
    })
  }

  return store
}
