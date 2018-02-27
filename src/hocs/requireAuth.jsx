import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {ROUTES} from '../routes'

const connector = connect(
  state => ({
    authToken: state.auth.token,
    location: state.router.location
  })
)

export const requireAuth = WrappedComponent => {
  const displayName = WrappedComponent.displayName || WrappedComponent.prototype.constructor.name

  return (
    connector(
      class extends Component {
        static displayName = `requireAuth(${displayName})`

        static propTypes = {
          authToken: PropTypes.string,
          location: PropTypes.object.isRequired
        }

        render() {
          const {authToken, location, ...clearedProps} = this.props
          if (authToken !== null) {
            return <WrappedComponent {...clearedProps} />
          } else {
            return <Redirect to={{pathname: ROUTES.authentication, state: {redirect: location.pathname}}} />
          }
        }
      }
    )
  )
}
