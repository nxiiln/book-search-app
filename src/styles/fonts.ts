import styled from 'styled-components'


export const FontsImporter = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
  position:  absolute;
  top: 0;
`

const fonts: string = `
  html {
    --font-main: 'Nunito', 'Colibri', sans-serif;
  }
`


export default fonts
