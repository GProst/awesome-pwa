import api from '../../../api'

import {setProfile} from '../../reducers/profile'

export const fetchProfileData = () => {
  return dispatch => {
    return api.fetchProfileData()
      .then((profile) => {
        dispatch(setProfile(profile))
      })
      .catch(err => {
        throw err
      })
  }
}
