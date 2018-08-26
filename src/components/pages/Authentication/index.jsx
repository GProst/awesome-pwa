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

const CONTENT_PADDING_WHEN_SCROLLED = 40

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  
  ${props => {
    if (!props.noScroll) {
      return `
        @media screen {
          padding: ${CONTENT_PADDING_WHEN_SCROLLED}px 0;
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

  static getDerivedStateFromProps(props, state) {
    AuthPage.updateState(props.authType)
    if (state.authType !== props.authType) {
      animateSwitchAuthType({to: props.authType})
      return {
        authType: props.authType
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
    // In one particular case we don't make it scrollable (small mobile device in portrait layout)
    // FixMe: but revise this logic again later (I mean the whole logic of isMobile/isDesktop env vars)
    if (process.env.isMobile === true) {
      const isPortrait = window.innerHeight > window.innerWidth
      if (isPortrait && window.innerHeight <= 568) {
        this.setState({
          noScroll: true
        })
        return
      }
    }
    const height = parseInt(window.getComputedStyle(this.content).height, 10)
    const verticalPadding = CONTENT_PADDING_WHEN_SCROLLED * 2
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

  componentDidUpdate(prevProps, prevState) {
    const {authTypeQueryString: prevAuthTypeQueryString} = prevProps
    const {authTypeQueryString} = this.props
    // If we redirected because of wrong auth type in url query, we have to check the need of the scroll
    if (
      ![AUTH_TYPE.signIn, AUTH_TYPE.signUp].includes(prevAuthTypeQueryString) &&
      [AUTH_TYPE.signIn, AUTH_TYPE.signUp].includes(authTypeQueryString)
    ) {
      this._checkScrollNecessity()
    }
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
