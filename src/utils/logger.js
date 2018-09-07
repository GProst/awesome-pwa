import Raven from 'raven-js'

export const logger = {
  error: (error, {extra} = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
      if (extra) console.error('Extra:', extra)
    }
  },

  errorRemote: (error, {extra} = {}) => {
    logger.error(error, {extra})
    Raven.captureException(error, {extra})
  }
}
