import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {AuthForm} from './AuthForm'
import {LogoWithTitle as _LogoWithTitle} from './LogoWithTitle'

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const LogoWithTitle = styled(_LogoWithTitle)`
  width: 132px;
  margin-bottom: 28px;
`

class AuthPageView extends React.Component {
  static displayName = 'AuthPageView'

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onInputBlur: PropTypes.func.isRequired
  }

  state = { // TODO: remove state from here as it is VIEW component (stateless)
    tabIndex: 0
  }

  formShowsErrors(form) {
    return Object.values(form).reduce((hasErrors, field) => {
      return hasErrors || Boolean(field.error)
    }, false)
  }

  onSubmit = (event) => {
    this.props.onSubmit(event)
  }

  onInputChange(fieldName, event) {
    this.props.onInputChange(fieldName, event)
  }

  onInputBlur(fieldName, event) {
    this.props.onInputBlur(fieldName, event)
  }

  onTabChange = (event, tabIndex) => {
    this.setState({tabIndex})
  }

  render() {
    return (
      <PageContainer>
        <Content>
          <LogoWithTitle />
          <AuthForm />
        </Content>
      </PageContainer>
    )
  }
}

export {
  AuthPageView
}
