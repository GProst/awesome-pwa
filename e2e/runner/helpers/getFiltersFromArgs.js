import {MAP_PARAM_TO_SUPPORTED, TEST_PARAM} from '../../constants/test-params'

export const getFiltersFromArgs = args => {
  try {
    const filters = {
      [TEST_PARAM.WINDOW_SIZE]: args[TEST_PARAM.WINDOW_SIZE]
        ? args[TEST_PARAM.WINDOW_SIZE].split(',').map(size => {
          const [width, height] = size.split('x').map(str => parseInt(str))
          return {width, height}
        })
        : Object.values(MAP_PARAM_TO_SUPPORTED[TEST_PARAM.WINDOW_SIZE]),
      [TEST_PARAM.TYPE]: args[TEST_PARAM.TYPE]
        ? args[TEST_PARAM.TYPE].split(',')
        : Object.values(MAP_PARAM_TO_SUPPORTED[TEST_PARAM.TYPE]),
      [TEST_PARAM.PRIORITY]: args[TEST_PARAM.PRIORITY]
        ? args[TEST_PARAM.PRIORITY].split(',')
        : Object.values(MAP_PARAM_TO_SUPPORTED[TEST_PARAM.PRIORITY])
    }

    if (args[TEST_PARAM.BROWSER]) {
      const browsersString = args[TEST_PARAM.BROWSER].split(';')
      browsersString.forEach(browserString => {
        const [browser, versionsString] = browserString.split(':')
        const versions = versionsString ? versionsString.split(',') : Object.values(MAP_PARAM_TO_SUPPORTED[TEST_PARAM.BROWSER_VERSION][browser])
        filters[TEST_PARAM.BROWSER] = {
          ...filters[TEST_PARAM.BROWSER],
          [browser]: versions
        }
      })
    } else {
      const supportedBrowsers = Object.values(MAP_PARAM_TO_SUPPORTED[TEST_PARAM.BROWSER])
      supportedBrowsers.forEach(browser => {
        filters[TEST_PARAM.BROWSER] = {
          ...filters[TEST_PARAM.BROWSER],
          [browser]: Object.values(MAP_PARAM_TO_SUPPORTED[TEST_PARAM.BROWSER_VERSION][browser])
        }
      })
    }

    if (args[TEST_PARAM.OS]) {
      const operatingSystemsString = args[TEST_PARAM.OS].split(';')
      operatingSystemsString.forEach(osString => {
        const [os, versionsString] = osString.split(':')
        const versions = versionsString ? versionsString.split(',') : Object.values(MAP_PARAM_TO_SUPPORTED[TEST_PARAM.OS_VERSION][os])
        filters[TEST_PARAM.OS] = {
          ...filters[TEST_PARAM.OS],
          [os]: versions
        }
      })
    } else {
      const supportedOperatingSystems = Object.values(MAP_PARAM_TO_SUPPORTED[TEST_PARAM.OS])
      supportedOperatingSystems.forEach(os => {
        filters[TEST_PARAM.OS] = {
          ...filters[TEST_PARAM.OS],
          [os]: Object.values(MAP_PARAM_TO_SUPPORTED[TEST_PARAM.OS_VERSION][os])
        }
      })
    }

    const sorter = (a, b) => parseFloat(a) - parseFloat(b)
    filters[TEST_PARAM.PRIORITY] = filters[TEST_PARAM.PRIORITY].sort(sorter)
    Object.entries(filters[TEST_PARAM.BROWSER]).forEach(([browserName, versions]) => {
      filters[TEST_PARAM.BROWSER][browserName] = versions.sort(sorter)
    })

    if (args[TEST_PARAM.ID]) {
      filters[TEST_PARAM.ID] = args[TEST_PARAM.ID].split(',')
    }

    return filters
  } catch(err) {
    console.error('Error while creating filter based on arguments', err)
    throw err
  }
}
