import {createStore as _createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {routerMiddleware, routerReducer} from 'react-router-redux'
import thunk from 'redux-thunk'
import Raven from 'raven-js'

import {history} from '../../history'
import * as reducers from '../reducers'
import {createRavenMiddleware} from '../middlewares/raven-for-redux'

export function createStore() {
  const middleware = [routerMiddleware(history), thunk, createRavenMiddleware(Raven)] // raven middleware should come before thunk
  const toCompose = []

  if (process.env.NODE_ENV !== 'production') {
    const {logger} = require('redux-logger')
    middleware.push(logger)
  }

  toCompose.unshift(applyMiddleware(...middleware))
  let enhancer = compose(...toCompose)

  const store = _createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
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
