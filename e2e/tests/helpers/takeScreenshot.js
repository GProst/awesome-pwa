import fs from 'fs'
import path from 'path'

import {logger} from '../../utils/logger'

const screenshotsDir = path.join(__dirname, '../../screenshots/')

const saveScreenshotFile = ({filename, data}) => {
  fs.writeFileSync(filename, data.replace(/^data:image\/png;base64,/, ''), 'base64')
}

export const takeScreenshot = async ({driver, testId, stepNumber, testParams: {capabilities}}) => {
  let filename
  try {
    filename = path.join(screenshotsDir, `id-${testId}.step-${stepNumber}---os-${capabilities.os}:${capabilities.osVersion}---browser-${capabilities.browser}:${capabilities.browserVersion}---window-size-${capabilities.windowSize.width}x${capabilities.windowSize.height}.png`)
    const data = await driver.takeScreenshot()
    try {
      saveScreenshotFile({filename, data})
    } catch(err) {
      if (err.code === 'ENOENT') {
        logger.info('Creating directory for screenshots.')
        fs.mkdirSync(screenshotsDir)
        saveScreenshotFile({filename, data})
      } else {
        throw err
      }
    }
    return stepNumber + 1
  } catch(err) {
    logger.error(`Error while taking screenshot! Filename: ${filename}`)
    throw err
  }
}
