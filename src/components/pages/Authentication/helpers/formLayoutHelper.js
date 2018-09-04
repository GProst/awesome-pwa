import {AUTH_TYPE} from '../constants'

export const formLayoutHelper = {
  forms: {},

  setFormNode: ({node, type}) => {
    formLayoutHelper.forms = {
      ...formLayoutHelper.forms,
      [type]: node
    }
  },

  getFormHeight: ({type}) => {
    const node = formLayoutHelper.forms[type]
    const {height} = window.getComputedStyle(node)
    return parseFloat(height, 10)
  },

  getFormHeightDiff: () => {
    const signInNode = formLayoutHelper.forms[AUTH_TYPE.signIn]
    const signUpNode = formLayoutHelper.forms[AUTH_TYPE.signUp]
    const {height: signInHeight} = window.getComputedStyle(signInNode)
    const {height: signUpHeight} = window.getComputedStyle(signUpNode)
    const diff = Math.abs(parseFloat(signInHeight, 10) - parseFloat(signUpHeight, 10))
    return diff
  }
}
