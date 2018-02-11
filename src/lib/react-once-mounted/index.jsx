import React from 'react'
import PropTypes from 'prop-types'

export class EnterState extends React.Component {
  static displayName = 'EnterState'

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  state = {
    onceMounted: false
  }

  _passEnterStateToChildren(children) {
    const mappedChildren = React.Children.map(children, child => {
      if (!child) return null
      const {onceMounted} = this.state
      return React.cloneElement(child, {
        onceMounted
      })
    })

    this.setState({
      children: mappedChildren
    })
  }

  componentWillMount() {
    this._passEnterStateToChildren(this.props.children)
    this.setState({
      onceMounted: true
    })
  }

  componentWillReceiveProps(nextProps) {
    this._passEnterStateToChildren(nextProps.children)
  }

  render() {
    return this.state.children
  }
}
