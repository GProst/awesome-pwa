const startUpElement = document.getElementById('startup')
const progressElement = startUpElement.querySelector('.startup__progress_fill')
const initialProgressValue = 0.01
progressElement.style.setProperty('transform', `scaleX(${initialProgressValue})`)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
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
  startUpElement.style.setProperty('opacity', '1')
}

export const setProgressValue = value => {
  if (value < initialProgressValue) return
  progressElement.style.setProperty('transform', `scaleX(${value})`)
}
