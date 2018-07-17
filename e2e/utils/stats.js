import fs from 'fs'
import path from 'path'
import minimist from 'minimist'

import {logger} from './logger'

const tests = {}

const args = minimist(process.argv.slice(2))

export const saveAllStats = () => {
  if (!args.saveStats) return
  let wasError = false
  Object.entries(tests).map(([testId, {dirname, stats}]) => {
    logger.debug(`Saving stats for test with ID=${testId}`)
    const statsFilename = path.join(dirname, `${testId}.stats.json`)
    try {
      fs.writeFileSync(statsFilename, JSON.stringify(stats, null, 2), 'utf8')
    } catch(err) {
      logger.error(`Error trying write stats.json file for test with ID=${testId}`, err)
      wasError = true
    }
  })
  if (wasError) {
    logger.error('Tests stats saved with some errors!')
  } else {
    logger.info('Tests stats saved!')
  }
}

export const addTestStats = ({dirname, stats}) => {
  if (!args.saveStats) return
  tests[stats.props.id] = {dirname, stats}
}

export const addTestParamsToStats = ({testId, testParams}) => {
  if (!args.saveStats) return
  tests[testId].stats.paramsCapabilities.push(testParams.capabilities)
}
