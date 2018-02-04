import React from 'react'
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
