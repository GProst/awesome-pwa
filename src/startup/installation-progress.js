const startUpElement = document.getElementById('startup')
const progressElement = startUpElement.querySelector('.startup__progress_fill')
let progressValue = 0.01
progressElement.style.setProperty('transform', `scaleX(${progressValue})`)

let helperInterval

// FixMe: I need to listen to this only on first installation, I don't want to listen to it when the second sw is being installed
// TODO: move it to function and invoke from index.js
// TODO: removeEventListener when you don't need it, and look for other eventListeners if they are to remove them too when needed
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    // TODO: I need to pass JSON as a message to have 'type' property there and 'payload' in order to distinguish if this is the right message we want to handle here
    if (helperInterval) clearInterval(helperInterval) // no need for our helper anymore
    setProgressValue(event.data)
  })
}

export const getStartUpElement = () => startUpElement

export const removeProgressBar = () => {
  startUpElement.remove()
}

export const hideProgressBar = () => {
  startUpElement.style.setProperty('opacity', '0')
}

export const showProgressBar = () => {
  helperInterval = setInterval(() => {
    if (progressValue < 0.1) setProgressValue(progressValue + 0.0025)
  }, 600) // Show progress even if we don't have real installation data received yet
  startUpElement.style.setProperty('opacity', '1')
}

export const setProgressValue = value => {
  if (value < progressValue) return
  progressValue = value
  progressElement.style.setProperty('transform', `scaleX(${progressValue})`)
}
