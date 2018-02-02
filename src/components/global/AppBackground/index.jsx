import React from 'react'
import PropTypes from 'prop-types'

import AppBackground from './view'

class AppBackgroundComp extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <AppBackground>
        {this.props.children}
      </AppBackground>
    )
  }
}

export default AppBackgroundComp
