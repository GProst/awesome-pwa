import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {animateSwitchAuthType, initAnimationValues} from './animations/switch-auth-type'
import {animateShowOnMount} from './animations/show-on-mount'

import {AuthForm} from './AuthForm'
import {BottomAction as _BottomAction} from './BottomAction'
import {LogoWithTitle as _LogoWithTitle} from './LogoWithTitle'
import {PageContainer} from '../../reusable/PageContainer'
import {ROUTES} from '../../../routes'
import {isDesktop} from '../../../utils/device'
import {isPortrait} from '../../../utils/window'
import {AUTH_TYPE} from './constants'

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
    const {authType: authTypeQueryString} = queryString.parse(state.router.location.search) // TODO: use URLSearchParams, remove query-string lib
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

  static getDerivedStateFromProps(props, state) {
    if (state.authType !== props.authType) {
      return {
        authType: props.authType
      }
    }
    return null
  }

  state = {
    authType: this.props.authType,
    initialAuthType: this.props.authType
  }

  constructor(props) {
    super(props)

    initAnimationValues(props.authType)
  }

  _checkScrollNecessity() {
    // In one particular case we don't make it scrollable (small mobile device in portrait layout)
    if (!isDesktop && isPortrait() && window.innerWidth < 400) {
      this.setState({
        noScroll: true
      })
      return
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
    animateShowOnMount()
  }

  componentDidUpdate(prevProps, prevState) {
    if (window.testThrowError === true) {
      throw new Error('Test error using window.testThrowError')
    }
    const {authType: prevAuthType} = prevState
    const {authType} = this.state
    const {authTypeQueryString: prevAuthTypeQueryString} = prevProps
    const {authTypeQueryString} = this.props
    // If we redirected because of wrong auth type in url query, we have to check the need of the scroll
    if (
      ![AUTH_TYPE.signIn, AUTH_TYPE.signUp].includes(prevAuthTypeQueryString) &&
      [AUTH_TYPE.signIn, AUTH_TYPE.signUp].includes(authTypeQueryString)
    ) {
      this._checkScrollNecessity()
    }
    if (prevAuthType !== authType) {
      animateSwitchAuthType({to: authType})
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    const {noScroll, initialAuthType, authType} = this.state
    const {authTypeQueryString} = this.props
    // The App should work without it, but I want to make sure I have correct query string in Address Bar
    // in case I will want to parse it again in some other place... and it just feels safer
    if (![AUTH_TYPE.signIn, AUTH_TYPE.signUp].includes(authTypeQueryString)) {
      return <Redirect to={{pathname: ROUTES.authentication}} />
    }
    return (
      <PageContainer noScroll={noScroll}>
        <Content innerRef={elem => { this.content = elem }} noScroll={noScroll}>
          <LogoWithTitle />
          <AuthForm initialAuthType={initialAuthType} authType={authType} />
          <BottomAction authType={authType} initialAuthType={initialAuthType} />
        </Content>
      </PageContainer>
    )
  }
}

const AuthPageConnected = connector(AuthPage)

export {
  AuthPageConnected as AuthPage
}
