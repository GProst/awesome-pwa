import {logger} from '../../utils/logger'

export const requestSWRegistration = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js')
      // registration worked TODO
    } catch(err) {
      // registration failed
      // TODO: pass network information: speed, id offline etc
      logger.errorRemote(err) // TODO: currently I'm not really sure when this can happen. Looks like doesn't happen when we offline and register the same SW.
      // TODO: check if after I activate the first SW and then will fetch to a new one OFFLINE will it throw error? Id yes... well... not cool
    }
  } else {
    logger.error('No \'serviceWorker\' in navigator!')
  }
}
