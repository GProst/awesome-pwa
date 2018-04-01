import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Provider, Subscribe} from 'unstated'

import {requireNoAuth} from '../../../hocs/requireNoAuth'
import {AUTH_TYPE, AuthPageStateContainer, authPageStateContainer} from './stateAuthPage'
import {animateSwitchAuthType, initAnimationValues} from './animations/switchAuthType'

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
    if (process.env.isMobile === true && !props.noScroll) {
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

const connector = connect(
  state => {
    const {authType} = queryString.parse(state.router.location.search)
    return {
      authType: authType || AUTH_TYPE.signUp
    }
  }
)

class AuthPage extends React.Component {
  static displayName = 'AuthPage'

  static propTypes = {
    authType: PropTypes.string
  }

  static updateState(queryAuthType) {
    authPageStateContainer.setAuthType(queryAuthType)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    AuthPage.updateState(nextProps.authType)
    if (prevState.authType !== nextProps.authType) {
      animateSwitchAuthType({to: nextProps.authType})
      return {
        authType: nextProps.authType
      }
    }
    return null
  }

  state = {
    authType: this.props.authType
  }

  constructor(props) {
    super(props)

    initAnimationValues(props.authType)
  }

  _checkScrollNecessity() {
    const height = parseInt(window.getComputedStyle(this.content).height, 10)
    const verticalPadding = 80
    this.setState({
      noScroll: (height + verticalPadding) <= window.innerHeight
    })
  }

  componentDidMount() {
    const onResize = () => {
      initAnimationValues(this.props.authType)
      this._checkScrollNecessity()
    }
    window.addEventListener('resize', onResize)
    this._checkScrollNecessity()
  }

  render() {
    const {noScroll} = this.state
    return (
      <Provider inject={[authPageStateContainer]}>
        <Subscribe to={[AuthPageStateContainer]}>
          {stateContainer => (
            <PageContainer noScroll={noScroll}>
              <Content innerRef={elem => { this.content = elem }} noScroll={noScroll}>
                <LogoWithTitle />
                <AuthForm />
                <BottomAction authType={stateContainer.state.authType} />
              </Content>
            </PageContainer>
          )}
        </Subscribe>
      </Provider>
    )
  }
}

const AuthPageGuarded = requireNoAuth(connector(AuthPage))

export {
  AuthPageGuarded as AuthPage
}
