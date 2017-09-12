import {createCookie, readCookie, deleteCookie} from '../utils/cookieManager'
import {TokenCookieName} from './constants'

class API {
  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // TODO: real request
        resolve({
          profile: {
            name: 'GProst'
          },
          token: 'asbgrsrvraaece'
        })
      }, 4000)
    })
      .catch((err) => {
        throw err
      })
  }

  fetchProfileData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // TODO: real request
        resolve({
          name: 'GProst'
        })
      }, 2000)
    })
      .catch((err) => {
        throw err
      })
  }

  setTokenCookie(token) {
    const cookieDuration = 7 // value in days
    const domain = process.env.DOMAIN
    createCookie(TokenCookieName, token, cookieDuration, domain)
  }

  readTokenCookie() {
    return readCookie(TokenCookieName)
  }

  deleteTokenCookie() {
    deleteCookie(TokenCookieName)
  }
}

export default new API()
