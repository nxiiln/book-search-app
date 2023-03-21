import { createGlobalStyle } from 'styled-components'
import fonts from './fonts'
import colors from './colors'


const GlobalStyle = createGlobalStyle`
  ${fonts}
  ${colors}

  * {
    box-sizing: border-box;
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

    img {
      filter: brightness(0.9);
      user-select: none;
    }
  }
`


export default GlobalStyle
