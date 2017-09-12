import {createStore as _createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {routerMiddleware, routerReducer} from 'react-router-redux'
import thunk from 'redux-thunk'

import history from '../../history'
import * as reducers from '../reducers/index'
import {getAuthInitialState} from '../reducers/auth/index'

export function createStore() {
  const middleware = [routerMiddleware(history), thunk]

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(require('redux-logger').createLogger())
  }

  let finalCreateStore = compose(applyMiddleware(...middleware))(_createStore)

  const store = finalCreateStore(combineReducers({
    ...reducers,
    router: routerReducer
  }), {
    auth: getAuthInitialState()
  })

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
