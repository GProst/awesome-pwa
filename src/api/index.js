export const api = {
  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // TODO: real request
        resolve({
          token: 'asbgrsrvraaece'
        })
      }, 4000)
    })
      .catch(err => {
        throw err
      })
  }
}
