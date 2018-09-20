module.exports = {
  urlsToCache: [ // only resources NEEDED to start app smoothly, other resources can be downloaded and cached later
    '/index.html',
    '/images/favicon.png', // TODO: I don't need it here
    '/app.js',
    '/vendors.js',
    '/fonts/roboto-400-latin.woff2',
    '/fonts/roboto-900-latin.woff2',
    '/manifest.webmanifest' // TODO: I don't need it here, but don't forget to update fetch event handler to cache this guy
  ]
}
