import styled from 'styled-components';


const Title = styled.h1<{fontSize?: string}>`
  margin: 0;
  font-family: var(--font-main);
  font-size: ${props => props.fontSize || '36px'};
  color: var(--color-main);
`


export default Title
