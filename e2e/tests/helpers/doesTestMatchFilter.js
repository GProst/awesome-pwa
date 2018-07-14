import {TEST_PARAM} from '../../constants/test-params'

export const doesTestMatchFilter = (params, testProps) => {
  const {capability} = testProps
  if (params[TEST_PARAM.PRIORITY].toString() !== testProps.priority.toString()) {
    return false
  }
  if (params[TEST_PARAM.TYPE] !== testProps.type) {
    return false
  }
  if (!capability.only && !capability.exclude) {
    return true
  }
  if (capability.only && capability.exclude) {
    throw new Error('testProps cant contain both \'only\' and \'exclude\' props')
  }
  if (capability.only) {
    return capability.only.reduce(
      (isMatch, testParamName, testParamValue) => isMatch && testParamValue.includes(params[testParamName]),
      true
    )
  }
  if (capability.exclude) {
    return capability.exclude.reduce(
      (isMatch, testParamName, testParamValue) => isMatch && !testParamValue.includes(params[testParamName]),
      true
    )
  }
}
