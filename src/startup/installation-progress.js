const startUpElement = document.getElementById('startup')
const progressElement = startUpElement.querySelector('.startup__progress_fill')
let progressValue = 0.01
progressElement.style.setProperty('transform', `scaleX(${progressValue})`)

let helperInterval

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
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
    setProgressValue(progressValue + 0.005)
  }, 600) // Show progress even if we don't have real installation data received yet
  startUpElement.style.setProperty('opacity', '1')
}

export const setProgressValue = value => {
  if (value < progressValue) return
  progressValue = value
  progressElement.style.setProperty('transform', `scaleX(${progressValue})`)
}
