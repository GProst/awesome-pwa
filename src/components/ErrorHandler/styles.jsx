import styled from 'styled-components'

const ErrorSnackBarContent = styled.div`
  max-width: 300px;
`
ErrorSnackBarContent.displayName = 'ErrorSnackBarContent'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`
Wrapper.displayName = 'Wrapper'

const closeButtonStyles = {
  width: '1em',
  height: '1em'
}

export {
  ErrorSnackBarContent,
  Wrapper,
  closeButtonStyles
}
