import Animated from 'animated/lib/targets/react-dom'

import {easeOut} from '../../../../constants/animation'
import {AUTH_TYPE} from '../constants'
import {formLayoutHelper} from '../helpers/form-layout-helper'

const getBaseDuration = () => window.testAnimationBaseDuration || 250
let currentAnimation = null
let initialAuthType

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

export const initAnimationValues = authType => {
  if (currentAnimation) currentAnimation.stop()
  initialAuthType = authType
  const {
    signUpForm, signInForm, toSignUpAction, toSignInAction, bottomActions, logoWithTitle, whiteContainer: {rect, roundedBottom, roundedTop}
  } = animState
  signInForm.setValue(authType === AUTH_TYPE.signIn ? 1 : 0)
  signUpForm.setValue(authType === AUTH_TYPE.signUp ? 1 : 0)
  toSignInAction.setValue(authType === AUTH_TYPE.signIn ? 0 : 1)
  toSignUpAction.setValue(authType === AUTH_TYPE.signUp ? 0 : 1)
  bottomActions.setValue(0)
  logoWithTitle.setValue(0)
  rect.setValue(1)
  roundedTop.setValue(0)
  roundedBottom.setValue(0)
}

export const animateSwitchAuthType = async ({to = AUTH_TYPE.signIn}) => {
  const {whiteContainer, toSignUpAction, toSignInAction, signInForm, signUpForm, bottomActions, logoWithTitle} = animState
  const toSignUp = to === AUTH_TYPE.signUp
  const toSignIn = to === AUTH_TYPE.signIn
  const disappearingAction = toSignUp ? toSignUpAction : toSignInAction
  const disappearingForm = toSignUp ? signInForm : signUpForm
  const appearingAction = toSignIn ? toSignUpAction : toSignInAction
  const appearingForm = toSignIn ? signInForm : signUpForm

  const diff = formLayoutHelper.getFormHeightDiff()
  const signInFormHeight = formLayoutHelper.getFormHeight({type: AUTH_TYPE.signIn})
  const signUpFormHeight = formLayoutHelper.getFormHeight({type: AUTH_TYPE.signUp})
  const rectToValue = initialAuthType === to
    ? 1
    : toSignUp
      ? signUpFormHeight / signInFormHeight
      : signInFormHeight / signUpFormHeight
  const roundedTopToValue = initialAuthType === to
    ? 0
    : toSignUp
      ? Math.round(-diff / 2)
      : Math.round(diff / 2)
  const bottomActionsToValue = -roundedTopToValue
  const logoWithTitleToValue = roundedTopToValue

  const baseDuration = getBaseDuration()

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
    Animated.timing(disappearingAction, {toValue: 0, duration: baseDuration / 2, easing: easeOut}),
    Animated.sequence([
      Animated.delay(baseDuration / 2),
      Animated.timing(appearingAction, {toValue: 1, duration: baseDuration / 2, easing: easeOut})
    ])
  ])
  currentAnimation.start(({finished}) => {
    if (finished) {
      currentAnimation = null
    }
  })
}
