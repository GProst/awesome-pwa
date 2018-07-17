import {MAP_FILTER_PARAM_TO_SUPPORTED, FILTER_PARAMS} from '../../constants/filter-params'
import {logger} from '../../utils/logger'

export const getFiltersFromArgs = args => {
  try {
    const filters = {
      [FILTER_PARAMS.WINDOW_SIZES]: args[FILTER_PARAMS.WINDOW_SIZES]
        ? args[FILTER_PARAMS.WINDOW_SIZES].split(',').map(size => {
          const [width, height] = size.split('x').map(str => parseInt(str))
          return {width, height}
        })
        : Object.values(MAP_FILTER_PARAM_TO_SUPPORTED[FILTER_PARAMS.WINDOW_SIZES]),
      [FILTER_PARAMS.TYPES]: args[FILTER_PARAMS.TYPES]
        ? args[FILTER_PARAMS.TYPES].split(',')
        : Object.values(MAP_FILTER_PARAM_TO_SUPPORTED[FILTER_PARAMS.TYPES]),
      [FILTER_PARAMS.PRIORITIES]: args[FILTER_PARAMS.PRIORITIES]
        ? args[FILTER_PARAMS.PRIORITIES].split(',')
        : Object.values(MAP_FILTER_PARAM_TO_SUPPORTED[FILTER_PARAMS.PRIORITIES]),
      [FILTER_PARAMS.INCOGNITO]: args[FILTER_PARAMS.INCOGNITO]
        ? [args[FILTER_PARAMS.INCOGNITO] === 'true']
        : [true, false]
    }

    if (args[FILTER_PARAMS.BROWSERS]) {
      const browsersString = args[FILTER_PARAMS.BROWSERS].split(';')
      browsersString.forEach(browserString => {
        const [browser, versionsString] = browserString.split(':')
        const versions = versionsString ? versionsString.split(',') : Object.values(MAP_FILTER_PARAM_TO_SUPPORTED[FILTER_PARAMS.BROWSER_VERSIONS][browser])
        filters[FILTER_PARAMS.BROWSERS] = {
          ...filters[FILTER_PARAMS.BROWSERS],
          [browser]: versions
        }
      })
    } else {
      const supportedBrowsers = Object.values(MAP_FILTER_PARAM_TO_SUPPORTED[FILTER_PARAMS.BROWSERS])
      supportedBrowsers.forEach(browser => {
        filters[FILTER_PARAMS.BROWSERS] = {
          ...filters[FILTER_PARAMS.BROWSERS],
          [browser]: Object.values(MAP_FILTER_PARAM_TO_SUPPORTED[FILTER_PARAMS.BROWSER_VERSIONS][browser])
        }
      })
    }

    if (args[FILTER_PARAMS.OSS]) {
      const operatingSystemsString = args[FILTER_PARAMS.OSS].split(';')
      operatingSystemsString.forEach(osString => {
        const [os, versionsString] = osString.split(':')
        const versions = versionsString ? versionsString.split(',') : Object.values(MAP_FILTER_PARAM_TO_SUPPORTED[FILTER_PARAMS.OS_VERSIONS][os])
        filters[FILTER_PARAMS.OSS] = {
          ...filters[FILTER_PARAMS.OSS],
          [os]: versions
        }
      })
    } else {
      const supportedOperatingSystems = Object.values(MAP_FILTER_PARAM_TO_SUPPORTED[FILTER_PARAMS.OSS])
      supportedOperatingSystems.forEach(os => {
        filters[FILTER_PARAMS.OSS] = {
          ...filters[FILTER_PARAMS.OSS],
          [os]: Object.values(MAP_FILTER_PARAM_TO_SUPPORTED[FILTER_PARAMS.OS_VERSIONS][os])
        }
      })
    }

    const sorter = (a, b) => parseFloat(a) - parseFloat(b)
    filters[FILTER_PARAMS.PRIORITIES] = filters[FILTER_PARAMS.PRIORITIES].sort(sorter)
    Object.entries(filters[FILTER_PARAMS.BROWSERS]).forEach(([browserName, versions]) => {
      filters[FILTER_PARAMS.BROWSERS][browserName] = versions.sort(sorter)
    })

    if (args[FILTER_PARAMS.IDS]) {
      filters[FILTER_PARAMS.IDS] = args[FILTER_PARAMS.IDS].split(',')
    }

    return filters
  } catch(err) {
    logger.error('Error while creating filter based on arguments', err)
    throw err
  }
}
