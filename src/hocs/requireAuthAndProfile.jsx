import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {Routes} from '../routes'

const connector = connect(
  state => ({
    profile: state.profile,
    authToken: state.auth.token,
    location: state.router.location
  })
)

export default (WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.prototype.constructor.name

  return (
    connector(
      class extends Component {
        static displayName = `requireAuth&Profile(${displayName})`

        static propTypes = {
          authToken: PropTypes.string,
          profile: PropTypes.object,
          location: PropTypes.object.isRequired
        }

        render() {
          const {profile, authToken, location, ...clearedProps} = this.props
          if (authToken !== null && profile !== null) {
            return <WrappedComponent {...clearedProps} />
          } else {
            if (authToken !== null) {
              return <Redirect to={{pathname: Routes.fetchingProfileData, state: {redirect: location.pathname}}} />
            }
            return <Redirect to={{pathname: Routes.authorization, state: {redirect: location.pathname}}} />
          }
        }
      }
    )
  )
}
