import React from 'react'
import styled from 'styled-components'
import requireAuthAndProfile from '../../hocs/requireAuthAndProfile'

const Wrapper = styled.div`
  color: brown;
`

class PostListPage extends React.Component {
  render() {
    return (
      <Wrapper>
        Post page!
      </Wrapper>
    )
  }
}

export default requireAuthAndProfile(PostListPage)
