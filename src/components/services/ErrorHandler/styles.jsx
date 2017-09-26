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
  width: '24px',
  height: '24px'
}

export {
  ErrorSnackBarContent,
  Wrapper,
  closeButtonStyles
}
