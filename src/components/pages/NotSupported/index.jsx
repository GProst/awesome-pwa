import React from 'react'

import requireNotSupportedBrowser from '../../../hocs/requireNotSupportedBrowser'

import ChromeLogo from './images/ChromeLogo'
import {Wrapper, Paper, Desc, Logo, TextLink} from './styles'

function NotSupported() {
  const downloadChrome = 'https://www.google.com/chrome/browser/desktop/index.html'
  return (
    <Wrapper>
      <Paper>
        <Logo href={downloadChrome} target='_blank' title='Google Chrome'>
          <ChromeLogo />
        </Logo>
        <Desc type='display1' align='center' component='h1'>
          Oops! We support&nbsp;
          <TextLink href={downloadChrome} target='_blank'>
            <b>Chrome</b>&nbsp;
          </TextLink>
          browser only <i>:P</i>
        </Desc>
      </Paper>
    </Wrapper>
  )
}

export default requireNotSupportedBrowser(NotSupported)
