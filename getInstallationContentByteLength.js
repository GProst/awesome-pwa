'use strict'

const path = require('path')
const fs = require('fs')
const {urlsToCache} = require('./src/service-worker/urls-to-cache')

const isProd = process.env.NODE_ENV === 'production'

const sumByteLength = urlsToCache.reduce((sum, fileName) => {
  const fileSize = fs.statSync(path.join(__dirname, 'dist', `.${fileName}`)).size
  !isProd && console.log(fileName, ':', fileSize) // eslint-disable-line
  return sum + fileSize
}, 0)

if (isProd) {
  console.log(sumByteLength) // eslint-disable-line
} else {
  console.log(`Sum: ${sumByteLength}`) // eslint-disable-line
}
