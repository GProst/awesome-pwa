import {createStore as _createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {routerMiddleware, routerReducer} from 'react-router-redux'
import thunk from 'redux-thunk'

import history from '../../history'
import * as reducers from '../reducers/index'
import {getAuthInitialState} from '../reducers/auth/index'

export function createStore() {
  const middleware = [routerMiddleware(history), thunk]
  const toCompose = [applyMiddleware(...middleware)]

  if (process.env.NODE_ENV !== 'production') {
    const DevTools = require('../DevTools').default
    toCompose.push(DevTools.instrument())
  }

  let enchancer = compose(...toCompose)

  const store = _createStore(combineReducers({
    ...reducers,
    router: routerReducer
  }), {
    auth: getAuthInitialState()
  },
  enchancer
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
