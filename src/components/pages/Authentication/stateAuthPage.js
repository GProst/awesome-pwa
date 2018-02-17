import {Container} from 'unstated'

export const AUTH_TYPE = {
  signUp: 'sign-up',
  signIn: 'sign-in'
}

export class AuthPageStateContainer extends Container {
  state = {
    authType: AUTH_TYPE.signUp,
    animating: false,
    forms: {}
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

  setFormNode = ({node, type}) => {
    this.setState({
      forms: {
        ...this.state.forms,
        [type]: node
      }
    })
  }

  getFormHeight = ({type}) => {
    const node = this.state.forms[type]
    const {height} = window.getComputedStyle(node)
    return parseFloat(height, 10)
  }

  getFormHeightDiff = () => {
    const signInNode = this.state.forms[AUTH_TYPE.signIn]
    const signUpNode = this.state.forms[AUTH_TYPE.signUp]
    const {height: signInHeight} = window.getComputedStyle(signInNode)
    const {height: signUpHeight} = window.getComputedStyle(signUpNode)
    const diff = Math.abs(parseFloat(signInHeight, 10) - parseFloat(signUpHeight, 10))
    return diff
  }
}

export const authPageStateContainer = new AuthPageStateContainer()
