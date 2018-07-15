import childProcess from 'child_process'

import {RESOLUTION} from '../../constants/supported-capabilities'
import {logger} from '../../utils/logger'

const {
  CODEBUILD_RESOLVED_SOURCE_VERSION, // git commit id in AWS, see https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html
  CODEBUILD_BUILD_ID // build id in AWS
} = process.env

let gitCommitSHA = CODEBUILD_RESOLVED_SOURCE_VERSION
if (!gitCommitSHA) {
  try {
    logger.info('No CODEBUILD_RESOLVED_SOURCE_VERSION env var found. Using local env.\n')
    gitCommitSHA = childProcess
      .execSync('git rev-parse HEAD')
      .toString().trim()
    gitCommitSHA = `${gitCommitSHA}(aprox)`
  } catch(err) {
    logger.error('Error getting git commit SHA', err)
  }
}

export const getCapabilities = ({testParams: {capabilities}, testId}) => {
  const {BROWSERSTACK_USER, BROWSERSTACK_KEY} = process.env
  return {
    project: 'Priority Book PWA',
    build: `git-commit:${gitCommitSHA}---build-id:${CODEBUILD_BUILD_ID || 'local-build'}`,
    name: `test-id-${testId}--window-size: ${capabilities.windowSize.width}x${capabilities.windowSize.height}`,
    os: capabilities.os,
    os_version: capabilities.osVersion,
    browserName: capabilities.browser,
    browser_version: capabilities.browserVersion,
    'browserstack.local': 'false',
    'browserstack.user': BROWSERSTACK_USER,
    'browserstack.key': BROWSERSTACK_KEY,
    resolution: `${RESOLUTION.width}x${RESOLUTION.height}`,
    chromeOptions: {
      args: ['--disable-infobars'] // won't show infobar that browser is run by driver
    }
  }
}
