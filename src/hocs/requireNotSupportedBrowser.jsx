import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import {Routes} from '../routes'
import {isChrome} from '../utils/browserManager'

export default (WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.prototype.constructor.name

  return class extends Component {
    static displayName = `requireNotSupportedBrowser(${displayName})`

    render() {
      if (!isChrome()) {
        return <WrappedComponent {...this.props} />
      } else {
        return <Redirect to={{pathname: Routes.main}} />
      }
    }
  }
}
