// TODO: noSupportPage in separate SSR page (check browser in backend)

export function isChrome() {
  // function was taken from https://stackoverflow.com/a/13348618/7376567
  let isChromium = window.chrome
  let winNav = window.navigator
  let vendorName = winNav.vendor
  let isOpera = winNav.userAgent.indexOf('OPR') > -1
  let isIEedge = winNav.userAgent.indexOf('Edge') > -1
  let isIOSChrome = winNav.userAgent.match('CriOS')

  if (isIOSChrome) {
    return true
  } else if (
    isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false
  ) {
    return true
  } else {
    return false
  }
}
