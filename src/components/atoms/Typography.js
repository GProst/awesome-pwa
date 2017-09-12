import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import withTheme from 'material-ui/styles/withTheme'

class MyTypography extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    color: PropTypes.shape({
      type: PropTypes.oneOf(['palette', 'common']).isRequired,
      payload: PropTypes.string.isRequired
    }),
    theme: PropTypes.object.isRequired
  }

  state = {}

  calculateColor(color) {
    if (!color) return
    if (color.type === 'palette') {
      this.setState({
        color: color.payload
      })
    } else {
      this.setState({
        style: {
          color: this.props.theme.palette.common[color.payload]
        }
      })
    }
  }

  componentWillMount() {
    this.calculateColor(this.props.color)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color !== this.props.color) {
      this.calculateColor(nextProps.color)
    }
  }

  render() {
    const {color, theme, children, ...props} = this.props

    return (
      <Typography style={this.state.style} color={this.state.color} {...props}>
        {children}
      </Typography>
    )
  }
}

export default withTheme(MyTypography)
