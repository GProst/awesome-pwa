import ReactDOM from 'react-dom'
import React from 'react'

import Root from './components/Root'

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
    module.hot.accept('./components/Root', () => { render(Root) })
  }
} else {
  ReactDOM.render(<Root />, document.getElementById('root'))
}
