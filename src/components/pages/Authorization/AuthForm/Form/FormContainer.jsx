import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {AUTH_TYPE} from '../../stateAuthPage'

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
    children: PropTypes.node.isRequired,
    authType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    formType: PropTypes.oneOf(Object.values(AUTH_TYPE)).isRequired,
    toggleView: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.authType) {
      this.props.toggleView()
    }
  }

  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    )
  }
}
