import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Provider} from 'unstated'

import {requireNoAuth} from '../../../hocs/requireNoAuth'
import {AuthPageStateContainer} from './stateAuthPage'

import {AuthForm} from './AuthForm'
import {BottomAction as _BottomAction} from './BottomAction'
import {LogoWithTitle as _LogoWithTitle} from './LogoWithTitle'
import {PageContainer} from '../../reusable/PageContainer'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  
  ${props => {
    if (process.env.isMobile === true) {
      return `
        @media screen and (orientation: landscape) {
          padding: 40px 0;
        }
      `
    }
  }}
`

const LogoWithTitle = styled(_LogoWithTitle)`
  width: 132px;
  margin-bottom: 28px;
`

const BottomAction = styled(_BottomAction)`
  margin-top: 28px;
`

const authPageStateContainer = new AuthPageStateContainer()

const connector = connect(
  (state) => {
    const {authType} = queryString.parse(state.router.location.search)
    return {
      authType
    }
  }
)

class AuthPage extends React.Component {
  static displayName = 'AuthPage'

  static propTypes = {
    authType: PropTypes.string
  }

  _updateState(queryAuthType) {
    authPageStateContainer.setAuthType(queryAuthType)
  }

  componentWillMount() {
    this._updateState(this.props.authType)
  }

  componentWillReceiveProps(nextProps) {
    this._updateState(nextProps.authType)
  }

  render() {
    return (
      <Provider inject={[authPageStateContainer]}>
        <PageContainer>
          <Content>
            <LogoWithTitle />
            <AuthForm />
            <BottomAction />
          </Content>
        </PageContainer>
      </Provider>
    )
  }
}

const AuthPageGuarded = requireNoAuth(connector(AuthPage))

export {
  AuthPageGuarded as AuthPage
}
