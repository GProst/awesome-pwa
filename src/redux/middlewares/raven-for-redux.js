// This is simplified version on https://github.com/captbaritone/raven-for-redux

const breadcrumbCategory = 'redux-action'
export const createRavenMiddleware = Raven =>
  store => {
    let lastAction

    Raven.setDataCallback((data, original) => {
      const state = store.getState()
      const reduxExtra = {
        lastAction: lastAction,
        state: state
      }
      data.extra = Object.assign(reduxExtra, data.extra)
      return original ? original(data) : data
    })

    return next => action => {
      // Log the action taken to Raven so that we have narrative context in our
      // error report.
      Raven.captureBreadcrumb({
        category: breadcrumbCategory,
        message: action.type
      })

      lastAction = action
      return next(action)
    }
  }
