export const doesTestMatchFilter = (params, testProps) => {
  if (!testProps.only && !testProps.exclude) {
    return true
  }
  if (testProps.only && testProps.exclude) {
    throw new Error('testProps cant contain both \'only\' and \'exclude\' props')
  }
  if (testProps.only) {
    return testProps.only.reduce(
      (isMatch, testParamName, testParamValue) => isMatch && testParamValue.includes(params[testParamName]),
      true
    )
  }
  if (testProps.exclude) {
    return testProps.exclude.reduce(
      (isMatch, testParamName, testParamValue) => isMatch && !testParamValue.includes(params[testParamName]),
      true
    )
  }
}
