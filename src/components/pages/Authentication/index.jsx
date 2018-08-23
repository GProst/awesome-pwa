import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Provider, Subscribe} from 'unstated'

import {requireNoAuth} from '../../../hocs/requireNoAuth'
import {AUTH_TYPE, AuthPageStateContainer, authPageStateContainer} from './stateAuthPage'
import {animateSwitchAuthType, initAnimationValues} from './animations/switchAuthType'

import {AuthForm} from './AuthForm'
import {BottomAction as _BottomAction} from './BottomAction'
import {LogoWithTitle as _LogoWithTitle} from './LogoWithTitle'
import {PageContainer} from '../../reusable/PageContainer'
import {ROUTES} from '../../../routes'

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
    const {authType: authTypeQueryString} = queryString.parse(state.router.location.search)
    let authType = authTypeQueryString
    if (![AUTH_TYPE.signIn, AUTH_TYPE.signUp].includes(authType)) authType = AUTH_TYPE.signUp
    return {
      authType,
      authTypeQueryString: authTypeQueryString || AUTH_TYPE.signUp
    }
  }
)

class AuthPage extends React.Component {
  static displayName = 'AuthPage'

  static propTypes = {
    authType: PropTypes.string,
    authTypeQueryString: PropTypes.string
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

  onResize = () => {
    initAnimationValues(this.props.authType)
    this._checkScrollNecessity()
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    // content may be absent since we can render Redirect
    if (this.content) this._checkScrollNecessity()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    const {noScroll} = this.state
    const {authTypeQueryString} = this.props
    // The App should work without it, but I want to make sure I have correct query string in Address Bar
    // in case I will want to parse it again in some other place... and it just feels safer
    if (![AUTH_TYPE.signIn, AUTH_TYPE.signUp].includes(authTypeQueryString)) {
      return <Redirect to={{pathname: ROUTES.authentication}} />
    }
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
