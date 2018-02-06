import styled from 'styled-components'

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  
  ${props => {
    if (process.env.isMobile === true) {
      return `
        @media screen and (orientation: landscape) {
          display: block;
        }
      `
    }
  }}
`