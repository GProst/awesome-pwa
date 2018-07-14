import fs from 'fs'
import path from 'path'

import {FILTER_PARAMS} from '../../constants/test-params'

const screenshotsDir = path.join(__dirname, '../../screenshots/')

const saveScreenshotFile = ({filename, data}) => {
  fs.writeFileSync(filename, data.replace(/^data:image\/png;base64,/, ''), 'base64')
}

export const takeScreenshot = async ({driver, testId, stepNumber, params}) => {
  let filename
  try {
    filename = path.join(screenshotsDir, `id-${testId}.step-${stepNumber}---os-${params[FILTER_PARAMS.OSS]}:${params[FILTER_PARAMS.OS_VERSIONS]}---browser-${params[FILTER_PARAMS.BROWSERS]}:${params[FILTER_PARAMS.BROWSER_VERSIONS]}---window-size-${params[FILTER_PARAMS.WINDOW_SIZES].width}x${params[FILTER_PARAMS.WINDOW_SIZES].height}.png`)
    const data = await driver.takeScreenshot()
    try {
      saveScreenshotFile({filename, data})
    } catch(err) {
      if (err.code === 'ENOENT') {
        // console.log('Creating directory for screenshots.') // TODO: logger
        fs.mkdirSync(screenshotsDir)
        saveScreenshotFile({filename, data})
      } else {
        throw err
      }
    }
    return stepNumber + 1
  } catch(err) {
    console.error(`Error while taking screenshot! Filename: ${filename}`)
    throw err
  }
}
