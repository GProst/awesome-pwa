'use strict'

const path = require('path')
const fs = require('fs')
const {urlsToCache} = require('./src/service-worker/urls-to-cache')

const sumByteLength = urlsToCache.reduce((sum, fileName) =>
  sum + fs.statSync(path.join(__dirname, 'dist', `.${fileName}`)).size, 0)

console.log(sumByteLength) // eslint-disable-line
