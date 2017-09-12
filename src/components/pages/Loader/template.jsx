import React from 'react'

import {CircularProgress} from 'material-ui/Progress'
import {Wrapper} from './styles'

class LoaderTemplate extends React.Component {
  render() {
    return (
      <Wrapper>
        <CircularProgress color='accent' size={70} />
      </Wrapper>
    )
  }
}

export default LoaderTemplate
