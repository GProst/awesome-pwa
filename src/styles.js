import {injectGlobal} from 'styled-components'

injectGlobal`
  html {
    font-family: sans-serif; /*fallback*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html.wf-active {
    font-family: "Roboto", sans-serif;
  }

  html {
    height: 100vh;
    width: 100vw;
  }

  body {
    height: 100%;

    // This is outer background, it is used for outside coloring
    // (for example on MacOS X you can sharply scroll page and see outside background)
    background: #8f57b4;
  }

  #root {
    height: 100%;
  }
  
  * {
    margin: 0;
    padding: 0;
  }
`
