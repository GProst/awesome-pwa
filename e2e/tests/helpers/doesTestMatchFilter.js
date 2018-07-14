export const doesTestMatchFilter = (testParams, testProps) => {
  const {capabilities} = testProps
  if (testParams.priority.toString() !== testProps.priority.toString()) {
    return false
  }
  if (testParams.type !== testProps.type) {
    return false
  }
  if (!capabilities.only && !capabilities.exclude) {
    return true
  }
  if (capabilities.only && capabilities.exclude) {
    throw new Error('testProps cant contain both \'only\' and \'exclude\' props')
  }
  if (capabilities.only) {
    return capabilities.only.reduce(
      (isMatch, capabilityKey, capabilityValue) => isMatch && capabilityValue.includes(testParams.capabilities[capabilityKey]),
      true
    )
  }
  if (capabilities.exclude) {
    return capabilities.exclude.reduce(
      (isMatch, testParamName, testParamValue) => isMatch && !testParamValue.includes(testParams[testParamName]),
      true
    )
  }
}
