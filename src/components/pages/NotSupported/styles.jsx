import styled from 'styled-components'
import PaperBase from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

const Wrapper = styled.div`
  background-color: ${props => props.theme.palette.background.default};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Paper = styled(PaperBase)`
  width: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`
Paper.displayName = 'Paper'

const Desc = styled(Typography)`
  line-height: 1.4;
`
Desc.displayName = 'Desc'

const Logo = styled.a`
  width: 8rem;
  height: auto;
  margin-bottom: 1.5rem;
  display: block;
  cursor: pointer;
  filter: drop-shadow(0 0 11px rgba(0,0,0,0.5));
`
Logo.displayName = 'Logo'

const TextLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: inline-block;
`
TextLink.displayName = 'TextLink'

export {
  Wrapper,
  Paper,
  Desc,
  Logo,
  TextLink
}
