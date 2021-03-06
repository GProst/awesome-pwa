import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const icons = {
  'AccountBox': (
    <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path d='M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z' />
      <path d='M0 0h24v24H0z' fill='none' />
    </svg>
  ),
  'Email': (
    <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
      <path d='M0 0h24v24H0z' fill='none' />
    </svg>
  ),
  'Lock': (
    <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' />
    </svg>
  ),
  'Visibility': (
    <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
    </svg>
  ),
  'VisibilityOff': (
    <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z' fill='none' />
      <path d='M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z' />
    </svg>
  )
}

const Container = styled.div`
    width: 24px;
    height: 24px;
    display: inline-block;
`

export class MaterialIcon extends React.Component {
  static displayName = 'MaterialIcon'

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.oneOf(Object.keys(icons)).isRequired
  }

  render() {
    return (
      <Container className={this.props.className}>
        {icons[this.props.name]}
      </Container>
    )
  }
}
