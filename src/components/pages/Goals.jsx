import React from 'react'
import styled from 'styled-components'

import requireAuth from '../../hocs/requireAuth'

const Wrapper = styled.div`
  color: blue;
`

class GoalsPageComp extends React.Component {
  render() {
    return (
      <Wrapper>
        You are in Goals page!
      </Wrapper>
    )
  }
}

export default requireAuth(GoalsPageComp)
