import {SHOW_MESSAGE, HIDE_MESSAGE} from './actions'

export * from './actions'

export const defaultState = {}

let idCounter = 0
const messageQuery = []

export const snackbar = (previousState = defaultState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      const message = {...action.message}
      message.id = ++idCounter
      messageQuery.push(message)
      return messageQuery[0]
    case HIDE_MESSAGE: {
      messageQuery.shift()
      return {...(messageQuery[0] || {})}
    }
    default:
      return previousState
  }
}
