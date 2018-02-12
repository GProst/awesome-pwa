import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export class FormContainer extends React.Component {
  static displayName = 'FormContainer'

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    )
  }
}
