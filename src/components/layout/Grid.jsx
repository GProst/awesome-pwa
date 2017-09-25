import styled, {css} from 'styled-components'

const GridContainer = styled.div`
  ${props => {
    const {xs3, sm, sm2} = props.theme.breakpoints
    return css`

  display: grid;

  @media (min-width: ${sm2}px) {
    grid-template-columns: repeat(12, auto);
  }
  
  @media (min-width: ${sm}px) and (max-width: ${sm2 - 1}px) {
    grid-template-columns: repeat(8, auto);
  }
  
  @media (max-width: ${xs3 - 1}px) {
    grid-template-columns: repeat(4, auto);
  }
  
    `
  }}
  ` // FixMe: this is a wrong indent, try to resolve this with pretier.js
GridContainer.displayName = 'GridContainer'

export default GridContainer
