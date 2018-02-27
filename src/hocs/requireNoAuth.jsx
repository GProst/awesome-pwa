import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {ROUTES} from '../routes'

const connector = connect(
  state => ({
    authToken: state.auth.token
  })
)

export const requireNoAuth = WrappedComponent => {
  const displayName = WrappedComponent.displayName || WrappedComponent.prototype.constructor.name

  return (
    connector(
      class extends Component {
        static displayName = `requireNoAuth(${displayName})`

        static propTypes = {
          authToken: PropTypes.string
        }

        render() {
          const {authToken, ...clearedProps} = this.props
          if (authToken === null) {
            return <WrappedComponent {...clearedProps} />
          } else {
            return <Redirect to={{pathname: ROUTES.main}} />
          }
        }
      }
    )
  )
}
