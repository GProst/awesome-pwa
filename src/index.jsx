import ReactDOM from 'react-dom'
import React from 'react'

import Root from './components/Root'

const moduleProxy = {
  get hot() {
    return module.hot
  },
  hotAccept(callback) {
    module.hot.accept('./components/Root', callback)
  }
}

export function init(module) {
  if (process.env.NODE_ENV !== 'production') {
    const {AppContainer} = require('react-hot-loader')
    const render = Component => {
      ReactDOM.render(
        <AppContainer>
          <Component />
        </AppContainer>,
        document.getElementById('root')
      )
    }

    render(Root)

    if (module.hot) {
      module.hotAccept(() => { render(Root) })
      return 'develop hot'
    }
    return 'develop'
  } else {
    ReactDOM.render(<Root />, document.getElementById('root'))
    return 'production'
  }
}

init(moduleProxy)
