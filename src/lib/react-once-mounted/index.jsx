import React from 'react'
import PropTypes from 'prop-types'

export class OnceMounted extends React.Component {
  static displayName = 'OnceMounted'

  static propTypes = {
    children: PropTypes.func.isRequired
  }

  state = {
    onceMounted: false
  }

  componentDidMount() {
    this.setState({
      onceMounted: true
    })
  }

  render() {
    return this.props.children(this.state.onceMounted)
  }
}
