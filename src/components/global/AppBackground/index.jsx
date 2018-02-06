import styled from 'styled-components'

const AppBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(-135deg, #CE93D8 0%, #4A148C 100%);
  
  ${props => {
    if (process.env.isMobile === true) {
      return `
        @media screen and (orientation: landscape) {
          overflow-y: auto;
        }
      `
    }
  }}
`

export {
  AppBackground
}
