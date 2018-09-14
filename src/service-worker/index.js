const CACHE_NAME = 'my-site-cache-v1'
const urlsToCache = [
  '/',
  '/images/favicon.png',
  '/app.js',
  '/runtime.js',
  '/vendors~app.js'
]

const onInstall = async event => {
  const cache = await caches.open(CACHE_NAME)
  return cache.addAll(urlsToCache)
}

const onActivate = async event => {
  return clients.claim()
}

// TODO: cover file with Sentry loggers

const onFetch = async event => {
  const cache = await caches.open(CACHE_NAME)
  const response = await cache.match(event.request)
  if (response) {
    return response
  }
  // this means user requested some SPA route like /authenticate or similar, I need to return index.html
  const indexHTMLRequest = new Request('/') // This is actually tricky because maybe I should copy all of other options from original request
  const indexHTMLResponse = await cache.match(indexHTMLRequest)
  if (indexHTMLResponse) {
    return indexHTMLResponse
  }
  // TODO: log error to Sentry, index.html should be in cache and should be returned, provide details
  return fetch(event.request)
}

self.addEventListener('install', event => {
  event.waitUntil(onInstall(event))
})

self.addEventListener('activate', event => {
  event.waitUntil(onActivate(event))
})

self.addEventListener('fetch', event => {
  const isOriginRequest = event.request.url.includes(location.origin)
  if (isOriginRequest) { // Don't intercept requests to other origins, this way the error will be thrown in main thread which is good for debugging
    event.respondWith(onFetch(event))
  }
})
