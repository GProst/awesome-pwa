import ReactDOM from 'react-dom'
import React from 'react'
import Raven from 'raven-js'

import './styles'

import {Root} from './components/Root'

Raven.context(() => {
  ReactDOM.render(<Root />, document.getElementById('root'))
})
