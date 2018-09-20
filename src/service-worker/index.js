import {urlsToCache} from './urls-to-cache'

const CACHE_NAME = 'my-site-cache-v1'
let installationContentByteLength

if (process.env.NODE_ENV === 'production') {
  installationContentByteLength = Number(process.env.INSTALLATION_ASSETS_BYTE_LENGTH.trim())
}

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
  if (process.env.NODE_ENV !== 'production') {
    installationContentByteLength = clonedResponses.reduce((sum, res) => {
      return sum + Number(res.headers.get('Content-Length'))
    }, 0)
  }
  let downloadedContentLength = 0
  const readResponseStream = response => {
    const reader = response.body.getReader()
    const push = async () => {
      const {done, value} = await reader.read()
      if (done) return
      downloadedContentLength += Number(value.byteLength) // value is Uint8Array or some other view
      const percent = downloadedContentLength / installationContentByteLength
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
  // TODO: handle cases (not only on this line) where request is failed due to user is offline -> I need to send a message to WindowClient to show 'No internet connection, check it and refresh'
  const response = await cache.match(event.request)
  if (response) {
    return response
  }
  // 1. TODO: if user asked for something that should be in the cache after installation, but it's not there -> means
  // user manually deleted it... which is a rare case I believe.
  // WRONG: In this case I should force-reinstall the app because we can't guarantee that if we get the assets from the net they won't be from new App version (incompatible)
  // WRONG: Keep in mind, browser either deletes all cache for an origin, or doesn't delete anything: https://developer.mozilla.org/en-US/docs/Web/API/Cache
  // TODO: for that matter I need to store fonts, images etc forever or mark a new version if I want to update it and probably I wan to do the same for ALL assets, YES! just store a separate version folders for each app version
  // TODO: so here check if the url in the urlsToCache or includes 'images' or 'fonts' and if YES -> download and cache
  // 2. TODO: actually user can also request additional font family, I need to fetch it and add to cache in parallel (let's keep fonts unchanged and always keep them there for backward compatibility of they are changed)
  // 3. If other cases then this means user requested some SPA route like /authenticate or similar, I need to return index.html
  const {url} = event.request
  if (url === location.origin || url === `${location.origin}/`) {
    const indexHTMLResponse = await cache.match(new Request('/index.html'))
    if (indexHTMLResponse) {
      return indexHTMLResponse
    }
    // TODO: fetch, cache and return
  }
  if (urlsToCache.includes(url) || url.includes('image') || url.includes('font')) { // I use singular form here just in case
    // TODO: cache responses
    return fetch(event.request)
  }
  const indexHTMLRequest = new Request('/index.html')
  const indexHTMLResponse = await cache.match(indexHTMLRequest)
  if (indexHTMLResponse) {
    return indexHTMLResponse
  }
  // Same thing, probably user deleted index.html from cache manually, this is a rare case, just download it and cache
  // TODO: cache index.html
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
