const {userAgent} = navigator

export const isAndroid = /Android/.test(userAgent)
export const isIOS = /(iPhone|iPad|like Mac OS)/.test(userAgent)
export const isDesktop = !isAndroid && !isIOS
