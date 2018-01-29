import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'

import {Routes} from '../../routes'

import requireAuthAndProfile from '../../hocs/requireAuthAndProfile'

const Wrapper = styled.div`
  color: blue;
`

class GoalsPage extends React.Component {
  render() {
    return (
      <Wrapper>
        You are in Goals page!
        <br />
        <Button component={Link} to={Routes.authorization}>
          Go to Auth page.
        </Button>
      </Wrapper>
    )
  }
}

export default requireAuthAndProfile(GoalsPage)
