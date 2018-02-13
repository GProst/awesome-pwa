import Animated from 'animated/lib/targets/react-dom'

import {AUTH_TYPE, authPageStateContainer} from './stateAuthPage'
import {easeIn, easeOut} from '../../../constants/animation'

export const baseDuration = 250 // TODO: remove export
let currentAnimation = null

// these values can be configured in each component in componentWillMount method, so keep in mind
export const animState = {
  paperContainer: new Animated.Value(0),
  toSignInAction: new Animated.Value(0),
  toSignUpAction: new Animated.Value(0),
  signInFrom: new Animated.Value(0),
  signUpForm: new Animated.Value(0)
}

export function animateSwitchAuthType({to = AUTH_TYPE.signIn}) {
  if (!authPageStateContainer.state.animating) authPageStateContainer.setAnimationStatus(true)

  const allowedValues = [AUTH_TYPE.signIn, AUTH_TYPE.signUp]
  if (!allowedValues.includes(to)) throw new Error(`Must provide property "to" with value: ${allowedValues.join(' or ')}`)

  const {paperContainer, toSignUpAction, toSignInAction, signInFrom, signUpForm} = animState
  const toSignUp = to === AUTH_TYPE.signUp
  const toSignIn = to === AUTH_TYPE.signIn
  const disappearingAction = toSignUp ? toSignUpAction : toSignInAction
  const disappearingForm = toSignUp ? signInFrom : signUpForm
  const appearingAction = toSignIn ? toSignUpAction : toSignInAction
  const appearingForm = toSignIn ? signInFrom : signUpForm

  if (currentAnimation) currentAnimation.stop()
  currentAnimation = Animated.parallel([
    Animated.timing(paperContainer, {toValue: toSignUp ? 1 : 0, duration: baseDuration, easing: easeOut}),
    Animated.sequence([
      Animated.timing(disappearingForm, {toValue: 0, duration: baseDuration / 2, easing: easeOut}),
      Animated.timing(appearingForm, {toValue: 1, duration: baseDuration / 2, easing: easeOut})
    ]),
    Animated.sequence([
      Animated.timing(disappearingAction, {toValue: 0, duration: baseDuration / 2, easing: easeOut}),
      Animated.delay(baseDuration * 1.25),
      Animated.timing(appearingAction, {toValue: 1, duration: baseDuration, easing: easeIn})
    ])
  ])
  currentAnimation.start(({finished}) => {
    if (finished) {
      currentAnimation = null
      authPageStateContainer.setAnimationStatus(false)
    }
  })
}
