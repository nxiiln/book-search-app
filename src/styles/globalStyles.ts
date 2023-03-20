import { createGlobalStyle } from 'styled-components'
import fonts from './fonts'
import colors from './colors'


const GlobalStyle = createGlobalStyle`
  ${fonts}
  ${colors}

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--font-main);
    background: var(--color-background-main);
  }
`


export default GlobalStyle
