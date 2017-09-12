import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {Routes} from '../routes'

const connector = connect(
  state => ({
    authToken: state.auth.token,
    profile: state.profile
  })
)

export default (WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.prototype.constructor.name

  return (
    connector(
      class extends Component {
        static displayName = `requireNoAuth(${displayName})`

        static propTypes = {
          authToken: PropTypes.string,
          profile: PropTypes.object
        }

        render() {
          const {authToken, profile, ...clearedProps} = this.props
          if (authToken === null) {
            return <WrappedComponent {...clearedProps} />
          } else {
            if (profile === null) {
              return <Redirect to={{pathname: Routes.fetchingProfileData}} />
            }
            return <Redirect to={{pathname: Routes.main}} />
          }
        }
      }
    )
  )
}
