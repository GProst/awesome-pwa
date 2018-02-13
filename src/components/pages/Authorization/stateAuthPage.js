import {Container} from 'unstated'

export const AUTH_TYPE = {
  signUp: 'sign-up',
  signIn: 'sign-in'
}

export class AuthPageStateContainer extends Container {
  state = {
    authType: AUTH_TYPE.signUp,
    animating: false
  }

  setAnimationStatus = status => {
    this.setState({
      animating: status
    })
  }

  setAuthType = authType => {
    if (authType !== this.state.authType && Object.values(AUTH_TYPE).includes(authType)) {
      this.setState({
        authType
      })
    }
  }
}

export const authPageStateContainer = new AuthPageStateContainer()
