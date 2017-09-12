import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {Routes} from '../routes'

const connector = connect(
  state => ({
    profile: state.profile,
    authToken: state.auth.token
  })
)

export default (WrappedComponent) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.prototype.constructor.name

  return (
    connector(
      class extends Component {
        static displayName = `requireAuthAndNoProfile(${displayName})`

        static propTypes = {
          profile: PropTypes.object,
          authToken: PropTypes.string
        }

        render() {
          const {profile, authToken, ...clearedProps} = this.props
          if (authToken !== null && profile === null) {
            return <WrappedComponent {...clearedProps} />
          } else {
            if (authToken === null) {
              return <Redirect to={{pathname: Routes.login}} />
            } else {
              return <Redirect to={{pathname: Routes.main}} />
            }
          }
        }
      }
    )
  )
}
