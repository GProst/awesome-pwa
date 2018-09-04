import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  color: blue;
`

export class GoalsPage extends React.Component {
  static displayName = 'GoalsPage'

  render() {
    return (
      <Container>
        You are in Goals page!
      </Container>
    )
  }
}
