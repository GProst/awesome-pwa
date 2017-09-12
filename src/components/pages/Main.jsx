import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'

import requireAuthAndProfile from '../../hocs/requireAuthAndProfile'

const Wrapper = styled.div`
  color: blue;
`

class MainPage extends React.Component {
  render() {
    return (
      <Wrapper>
        You are in Main page!
        <br />
        <Button component={Link} to='/login'>
          Go to Login page.
        </Button>
      </Wrapper>
    )
  }
}

export default requireAuthAndProfile(MainPage)
