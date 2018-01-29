import {injectGlobal} from 'styled-components'

injectGlobal`
  html {
    font-family: sans-serif; /*fallback*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 1280px;
  }

  html.wf-active {
    font-family: "Roboto", sans-serif;
  }

  html {
    height: 100vh;
  }

  body {
    height: 100%;
  }

  #root {
    height: 100%;
  }
  
  * {
    margin: 0;
    padding: 0;
  }
`
