import styled from 'styled-components'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

const Wrapper = styled.div`
  background-color: ${props => props.theme.palette.background.default};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`
Wrapper.displayName = 'Wrapper'

const ProgressContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`
ProgressContainer.displayName = 'ProgressContainer'

const Form = styled(Paper)`
  width: 512px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
`
Form.displayName = 'Form'

const Header = styled.div`
  background-color: ${props => props.theme.palette.primary['500']};
  padding: 24px 48px;
`
Header.displayName = 'Header'

const MainContent = styled.div`
  padding: 40px 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-grow: 1;
`
MainContent.displayName = 'MainContent'

const Inputs = styled.div`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;
`
Inputs.displayName = 'Inputs'

const InputRow = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  margin-bottom:16px;
`
InputRow.displayName = 'InputRow'

const Label = styled.label`
  margin-right: 10px;
  color: ${props => props.theme.palette.grey['600']};
  
  ${props => !props.error && 'margin-top: 18px;'}
`
Label.propTypes = {
  error: PropTypes.bool
}
Label.displayName = 'Label'

export {
  Wrapper,
  Form,
  Header,
  MainContent,
  Inputs,
  InputRow,
  Label,
  ProgressContainer
}
