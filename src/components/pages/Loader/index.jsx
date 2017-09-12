import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'

import {Routes} from '../../../routes'

import requireAuthAndNoProfile from '../../../hocs/requireAuthAndNoProfile'

import {fetchProfileData} from '../../../redux/genericActions/api/index'
import {clearToken} from '../../../redux/reducers/auth/index'
import {setError} from '../../../redux/reducers/error/index'

import LoaderTemplate from './template'

const connector = connect(
  (state) => ({
    location: state.router.location
  }),
  dispatch => ({
    fetchProfileData() {
      return dispatch(fetchProfileData())
    },
    push(path) {
      dispatch(push(path))
    },
    clearToken() {
      dispatch(clearToken())
    },
    setError(error) {
      dispatch(setError(error))
    }
  })
)

class LoaderPage extends React.Component {
  static propTypes = {
    fetchProfileData: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    clearToken: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        redirect: PropTypes.string.isRequired
      })
    }).isRequired,
    setError: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchProfileData()
      .then(() => {
        const {state} = this.props.location
        if (state && state.redirect && state.redirect !== Routes.main) { // we will be automatically redirected to this route
          this.props.push(state.redirect)
        }
      })
      .catch(err => {
        this.props.setError(err.message) // TODO: custom error message
        this.props.clearToken()
        throw err
      })
  }

  render() {
    return (
      <LoaderTemplate />
    )
  }
}

export default requireAuthAndNoProfile(connector(LoaderPage))
