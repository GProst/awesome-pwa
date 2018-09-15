const CACHE_NAME = 'my-site-cache-v1'
const urlsToCache = [
  '/',
  '/images/favicon.png',
  '/app.js',
  '/runtime.js',
  '/vendors~app.js',
  '/fonts/roboto-400-latin.woff2',
  '/fonts/roboto-900-latin.woff2'
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
  // 1. TODO: if user asked for something that should be in the cache after installation, but it's not there -> means
  // either user manually deleted it or browser deleted it due to lack of a space... which is a rare case I believe.
  // In this case I should force-reinstall the app because we can't guarantee that if we get the assets from the net they won't be from new App version (incompatible)
  // Keep in mind, browser either deletes all cache for an origin, or doesn't delete anything: https://developer.mozilla.org/en-US/docs/Web/API/Cache
  // 2. TODO: actually user can also request additional font family, I need to fetch it and add to cache in parallel (let's keep fonts unchanged and always keep them there for backward compatibility of they are changed)
  // 3. If other cases then this means user requested some SPA route like /authenticate or similar, I need to return index.html
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
