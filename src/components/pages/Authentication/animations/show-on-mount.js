import Animated from 'animated/lib/targets/react-dom'

import {easeIn} from '../../../../constants/animation'

let currentAnimation = null

export const animState = {
  authFrom: new Animated.Value(0),
  bottomActions: new Animated.Value(0),
  logoWithTitle: new Animated.Value(0)
}

export const animateShowOnMount = async () => {
  const {authFrom, bottomActions, logoWithTitle} = animState

  const baseDuration = 300

  if (currentAnimation) currentAnimation.stop()
  currentAnimation = Animated.parallel([
    Animated.timing(authFrom, {toValue: 1, duration: baseDuration, easing: easeIn}),
    Animated.sequence([
      Animated.delay(baseDuration * 0.25),
      Animated.timing(logoWithTitle, {toValue: 1, duration: baseDuration, easing: easeIn})
    ]),
    Animated.sequence([
      Animated.delay(baseDuration * 0.5),
      Animated.timing(bottomActions, {toValue: 1, duration: baseDuration, easing: easeIn})
    ])
  ])
  currentAnimation.start(({finished}) => {
    if (finished) {
      currentAnimation = null
    }
  })
}
