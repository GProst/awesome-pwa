import {push} from 'react-router-redux'

import {Routes} from '../../../routes'
import {isChrome} from '../../../utils/browserManager'

export const validateBrowser = (store) => {
  const {pathname} = store.getState().router.location
  pathname !== Routes.notSupported && !isChrome() && store.dispatch(push(Routes.notSupported))
}
