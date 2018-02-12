import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

class Invisible extends React.Component {
  static displayName = 'Invisible'

  static propTypes = {
    children: PropTypes.element.isRequired,
    onMounted: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.onMounted(this.container.firstChild)
  }

  render() {
    return (
      <div ref={elem => { this.container = elem }} style={{position: 'absolute', visibility: 'hidden'}}>
        {this.props.children}
      </div>
    )
  }
}

export function renderInvisibly(Component) {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const removeFromDOM = _ => {
      div.remove()
    }

    const onMounted = node => {
      resolve({node, removeFromDOM})
    }

    ReactDOM.render(
      (
        <Invisible onMounted={onMounted}>
          {Component}
        </Invisible>
      ),
      div
    )
  })
}
