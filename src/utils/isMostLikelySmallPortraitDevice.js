export const isMostLikelySmallPortraitDevice = () => {
  // Min width for Desktop Chrome browser is 400 px
  return window.innerWidth < 400 && window.innerHeight > window.innerWidth
}
