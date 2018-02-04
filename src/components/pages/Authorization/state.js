import {Container} from 'unstated'

export const AUTH_TYPE = {
  signUp: 0,
  signIn: 1
}

export class AuthPageStateContainer extends Container {
  state = {
    authType: AUTH_TYPE.signUp
  }

  switchAuthType = () => {
    this.setState({
      authType: this.state.authType === AUTH_TYPE.signUp ? AUTH_TYPE.signIn : AUTH_TYPE.signUp
    })
  }
}
