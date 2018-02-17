import Animated from 'animated/lib/targets/react-dom'

import {AUTH_TYPE, authPageStateContainer} from '../stateAuthPage'
import {easeIn, easeOut} from '../../../../constants/animation'

const baseDuration = 250
let currentAnimation = null
let initialAuthType

export function setInitialAuthType(type) {
  initialAuthType = type
}

// these values can be configured in each component in componentWillMount method, so keep in mind
export const animState = {
  whiteContainer: {
    rect: new Animated.Value(1),
    roundedTop: new Animated.Value(0),
    roundedBottom: new Animated.Value(0)
  },
  bottomActions: new Animated.Value(0),
  logoWithTitle: new Animated.Value(0),
  toSignInAction: new Animated.Value(0),
  toSignUpAction: new Animated.Value(0),
  signInForm: new Animated.Value(0),
  signUpForm: new Animated.Value(0)
}

export function animateSwitchAuthType({to = AUTH_TYPE.signIn}) {
  if (!authPageStateContainer.state.animating) authPageStateContainer.setAnimationStatus(true)

  const allowedValues = [AUTH_TYPE.signIn, AUTH_TYPE.signUp]
  if (!allowedValues.includes(to)) throw new Error(`Must provide property "to" with value: ${allowedValues.join(' or ')}`)

  const {whiteContainer, toSignUpAction, toSignInAction, signInForm, signUpForm, bottomActions, logoWithTitle} = animState
  const toSignUp = to === AUTH_TYPE.signUp
  const toSignIn = to === AUTH_TYPE.signIn
  const disappearingAction = toSignUp ? toSignUpAction : toSignInAction
  const disappearingForm = toSignUp ? signInForm : signUpForm
  const appearingAction = toSignIn ? toSignUpAction : toSignInAction
  const appearingForm = toSignIn ? signInForm : signUpForm

  const diff = authPageStateContainer.getFormHeightDiff()
  const signInFormHeight = authPageStateContainer.getFormHeight({type: AUTH_TYPE.signIn})
  const signUpFormHeight = authPageStateContainer.getFormHeight({type: AUTH_TYPE.signUp})
  const rectToValue = initialAuthType === to
    ? 1
    : toSignUp
      ? signUpFormHeight / signInFormHeight
      : signInFormHeight / signUpFormHeight
  const roundedTopToValue = initialAuthType === to
    ? 0
    : toSignUp
      ? -(diff / 2)
      : (diff / 2)
  const bottomActionsToValue = -roundedTopToValue
  const logoWithTitleToValue = roundedTopToValue

  if (currentAnimation) currentAnimation.stop()
  currentAnimation = Animated.parallel([
    Animated.timing(whiteContainer.rect, {toValue: rectToValue, duration: baseDuration, easing: easeOut}),
    Animated.timing(whiteContainer.roundedTop, {toValue: roundedTopToValue, duration: baseDuration, easing: easeOut}),
    Animated.timing(whiteContainer.roundedBottom, {toValue: -roundedTopToValue, duration: baseDuration, easing: easeOut}),
    Animated.timing(bottomActions, {toValue: bottomActionsToValue, duration: baseDuration, easing: easeOut}),
    Animated.timing(logoWithTitle, {toValue: logoWithTitleToValue, duration: baseDuration, easing: easeOut}),
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
