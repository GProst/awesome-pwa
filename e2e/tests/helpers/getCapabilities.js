import {FILTER_PARAMS} from '../../constants/test-params'
import {RESOLUTION} from '../../constants/supported-capabilities'
import childProcess from 'child_process'

const {
  CODEBUILD_RESOLVED_SOURCE_VERSION, // git commit id in AWS, see https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html
  CODEBUILD_BUILD_ID // build id in AWS
} = process.env

let gitCommitSHA = CODEBUILD_RESOLVED_SOURCE_VERSION
if (!gitCommitSHA) {
  try {
    // console.log('No CODEBUILD_RESOLVED_SOURCE_VERSION env var found. Using local env.') // TODO: logger
    gitCommitSHA = childProcess
      .execSync('git rev-parse HEAD')
      .toString().trim()
    gitCommitSHA = `${gitCommitSHA}(aprox)`
  } catch(err) {
    console.error('Error getting git commit SHA', err)
  }
}

export const getCapabilities = ({params, testId}) => {
  const {BROWSERSTACK_USER, BROWSERSTACK_KEY} = process.env
  return {
    project: 'Priority Book PWA',
    build: `git-commit:${gitCommitSHA}---build-id:${CODEBUILD_BUILD_ID || 'local-build'}`,
    name: `test-id-${testId}`,
    os: params[FILTER_PARAMS.OSS],
    os_version: params[FILTER_PARAMS.OS_VERSIONS],
    browserName: params[FILTER_PARAMS.BROWSERS],
    browser_version: params[FILTER_PARAMS.BROWSER_VERSIONS],
    'browserstack.local': 'false',
    'browserstack.user': BROWSERSTACK_USER,
    'browserstack.key': BROWSERSTACK_KEY,
    resolution: `${RESOLUTION.width}x${RESOLUTION.height}`,
    chromeOptions: {
      args: ['--disable-infobars'] // won't show infobar that browser is run by driver
    }
  }
}
