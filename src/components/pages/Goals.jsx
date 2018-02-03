import React from 'react'
import styled from 'styled-components'

import requireAuth from '../../hocs/requireAuth'

const Container = styled.div`
  color: blue;
`

class GoalsPage extends React.Component {
  render() {
    return (
      <Container>
        You are in Goals page!
      </Container>
    )
  }
}

const GoalsPageGuarded = requireAuth(GoalsPage)

export {
  GoalsPageGuarded as GoalsPage
}
