import ReactDOM from 'react-dom'
import React from 'react'
import Raven from 'raven-js'

import './styles'
import './font'

import {Root} from './components/Root'

import {requestSWRegistration} from './service-worker/main-thread'

if (process.env.NODE_ENV === 'production' || process.env.ENABLE_SENTRY) {
  Raven.config('https://da577743572c43c6b283974088c264a5@sentry.io/1275476', {
    release: process.env.APP_RELEASE,
    environment: process.env.APP_ENVIRONMENT,
    includePaths: [new RegExp(window.location.origin)],
    ignoreErrors: [ // This was taken from here: https://docs.sentry.io/clients/javascript/tips/
      // Random plugins/extensions
      'top.GLOBALS',
      // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error. html
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'http://tt.epicplay.com',
      'Can\'t find variable: ZiteReader',
      'jigsaw is not defined',
      'ComboSearch is not defined',
      'http://loading.retry.widdit.com/',
      'atomicFindClose',
      // Facebook borked
      'fb_xd_fragment',
      // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
      // reduce this. (thanks @acdha)
      // See http://stackoverflow.com/questions/4113268
      'bmi_SafeAddOnload',
      'EBCallBackMessageReceived',
      // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
      'conduitPage'
    ],
    ignoreUrls: [
      // Facebook flakiness
      /graph\.facebook\.com/i,
      // Facebook blocked
      /connect\.facebook\.net\/en_US\/all\.js/i,
      // Woopra flakiness
      /eatdifferent\.com\.woopra-ns\.com/i,
      /static\.woopra\.com\/js\/woopra\.js/i,
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      // Other plugins
      /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
      /webappstoolbarba\.texthelp\.com\//i,
      /metrics\.itunes\.apple\.com\.edgesuite\.net\//i
    ]
  }).install()
}

Raven.context(function() {
  requestSWRegistration()
  ReactDOM.render(<Root />, document.getElementById('root'))
})
