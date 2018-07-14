import fs from 'fs'
import path from 'path'

import {TEST_PARAM} from '../../constants/test-params'

const screenshotsDir = path.join(__dirname, '../../screenshots/')

const saveScreenshotFile = ({filename, data}) => {
  fs.writeFileSync(filename, data.replace(/^data:image\/png;base64,/, ''), 'base64')
}

export const takeScreenshot = async ({driver, testId, stepNumber, params}) => {
  let filename
  try {
    filename = path.join(screenshotsDir, `id-${testId}.step-${stepNumber}---os-${params[TEST_PARAM.OS]}:${params[TEST_PARAM.OS_VERSION]}---browser-${params[TEST_PARAM.BROWSER]}:${params[TEST_PARAM.BROWSER_VERSION]}---window-size-${params[TEST_PARAM.WINDOW_SIZE].width}x${params[TEST_PARAM.WINDOW_SIZE].height}.png`)
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
