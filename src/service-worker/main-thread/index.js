import {logger} from '../../utils/logger'

export const requestSWRegistration = async () => {
  if ('serviceWorker' in navigator) {
    try {
      let reg = await navigator.serviceWorker.getRegistration()
      if (!reg) { // means no sw is registered at all, this check works also for force-refresh ☺️ unlike navigator.serviceWorker.controller check
        try {
          reg = await navigator.serviceWorker.register('/sw.js')
          // Created our first registration, and currently first sw is in reg.installing
        } catch(err) {
          // TODO: don't send to Sentry if we're offline, but that's unlikely the case because it's first install, so user had to be online to get index.html
          // TODO: pass network information: speed
          logger.errorRemote(err)
        }
      } else {
        // Registration already exists, means there is reg.active sw that controls the page
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
