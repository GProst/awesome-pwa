import Raven from 'raven-js'

import {logger} from '../utils/logger'
import {setIsAppFirstInstallation} from '../utils/app-installation'
import {removeProgressBar, showProgressBar} from './installation-progress'

import {startApp} from './start-app'

// TODO: no need to place it in startup.js, move it to app.js
window.addEventListener('beforeinstallprompt', e => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault()
  setTimeout(() => {
    // TODO: save the event and prompt user when needed
    e.prompt()
  }, 7000)
})

const requestSWRegistration = async () => {
  if ('serviceWorker' in navigator) {
    try {
      let reg = await navigator.serviceWorker.getRegistration()
      const isFirstInstallation = !reg
      setIsAppFirstInstallation(isFirstInstallation)
      if (isFirstInstallation) { // means no sw is registered at all, this check works also for force-refresh ☺️ unlike navigator.serviceWorker.controller check
        try {
          showProgressBar()
          navigator.serviceWorker.oncontrollerchange = startApp // navigator.serviceWorker.ready.then(startApp) failed because somehow requests weren't caught by SW, see this: https://stackoverflow.com/questions/40161452/service-worker-controllerchange-never-fires
          reg = await navigator.serviceWorker.register('/sw.js')
          // Created our first registration, and currently first sw is in reg.installing
        } catch(err) {
          // TODO: don't send to Sentry if we're offline, but that's unlikely the case because it's first install, so user had to be online to get index.html
          // TODO: pass network information: speed
          logger.errorRemote(err)
        }
      } else {
        // Registration already exists, means there is reg.active sw that controls the page
        removeProgressBar()
        startApp()
        try {
          // await navigator.serviceWorker.register('/sw-new.js') // TODO: registering new SW
          // The registration returned by new 'register' call is actually the existing one, so I don't need to assign again
          // You can access new SW in reg.installing and current one in reg.active, reg.waiting is null at this moment
        } catch(err) {
          // TODO: don't send to Sentry if we're offline, that's expected error
          // TODO: pass network information: speed
          logger.errorRemote(err)
        }
      }
    } catch(err) {
      logger.errorRemote(err, {extra: {message: 'Error getting registration using navigator.serviceWorker.getRegistration()...'}})
    }
  } else {
    logger.errorRemote(new Error('No \'serviceWorker\' in navigator!'))
    // TODO: I don't really know when this can happen... probably if API in browser changes
    // I'should probably show something?.. "Something went wrong, make sure you use a supported Chrome browser version and HTTPS protocol"
  }
}

Raven.context(() => {
  requestSWRegistration()
})
