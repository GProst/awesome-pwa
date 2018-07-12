import swd from 'selenium-webdriver'
import {setWindowSize} from './utils'
const {WINDOW_SIZE: {_400_X_728}, RESOLUTION: {_1920x1080}} = require('./constants')

const {BROWSERSTACK_USER, BROWSERSTACK_KEY} = process.env

// Input capabilities
const capabilities = {
  os: 'OS X',
  os_version: 'High Sierra',
  browserName: 'Chrome',
  browser_version: '67.0',
  'browserstack.local': 'false',
  'browserstack.user': BROWSERSTACK_USER,
  'browserstack.key': BROWSERSTACK_KEY,
  resolution: `${_1920x1080.width}x${_1920x1080.height}`,
  chromeOptions: {
    args: ['--disable-infobars']
  }
}

const driver = new swd.Builder()
  .usingServer('http://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities(capabilities)
  .build()

setWindowSize({
  driver,
  windowInnerSize: _400_X_728,
  resolution: _1920x1080
})
  .then(() => {
    driver.get('https://dwgo2lfl43tk4.cloudfront.net/')
      .then(() => {
        driver
          .sleep(3000)
          .then(() => {
            driver.quit()
          })
      })
      .catch(() => {
        driver.quit()
      })
  })
  .catch(() => {
    driver.quit()
  })
