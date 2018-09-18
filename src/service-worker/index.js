const CACHE_NAME = 'my-site-cache-v1'
// WARNING!!! Remember to set X-Original-Content-Length header for each new asset
const urlsToCache = [
  '/',
  '/images/favicon.png',
  '/app.js',
  '/vendors.js',
  '/fonts/roboto-400-latin.woff2',
  '/fonts/roboto-900-latin.woff2'
]

const onInstall = async event => {
  const windowClients = await clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
  })
  const cache = await caches.open(CACHE_NAME)
  const fetches = []
  urlsToCache.forEach(url => {
    fetches.push(fetch(url))
  })
  const responses = await Promise.all(fetches)
  const clonedResponses = responses.map(res => res.clone())
  const sumContentLength = clonedResponses.reduce((sum, res) => {
    // return sum + Number(res.headers.get('X-Original-Content-Length')) // TODO: fix this, this is super lame!
    return sum + Number(res.headers.get('Content-Language'))
  }, 0)
  let downloadedContentLength = 0
  const readResponseStream = response => {
    const reader = response.body.getReader()
    const push = async () => {
      const {done, value} = await reader.read()
      if (done) return
      downloadedContentLength += Number(value.byteLength) // value is Uint8Array or some other view
      const percent = downloadedContentLength / sumContentLength
      windowClients.forEach(wClient => {
        wClient.postMessage(percent)
      })
      await push()
    }
    return push()
  }
  const streamReadingProcesses = clonedResponses.map(res => readResponseStream(res))
  const cachePutPromises = []
  // cache responses
  responses.forEach((response, index) => {
    cachePutPromises.push(cache.put(urlsToCache[index], response))
  })
  return Promise.all([...cachePutPromises, ...streamReadingProcesses])
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
