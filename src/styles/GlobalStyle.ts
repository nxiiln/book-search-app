import { createGlobalStyle } from 'styled-components'
import { fonts } from './fonts'
import { colors } from './colors'


const GlobalStyle = createGlobalStyle`
  ${fonts}
  ${colors}

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  *::selection {
    background: var(--color-accent-second);
  }

  body {
    margin: 0;
    font-family: var(--font-main);
    background: var(--color-second);

    &::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-fade);
    }
  }
`


export default GlobalStyle
