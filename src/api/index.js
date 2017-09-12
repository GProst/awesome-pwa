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
}

export default new API()
