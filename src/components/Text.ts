import styled from 'styled-components';


const Text = styled.span<{fontSize?: string}>`
  font-family: var(--font-main);
  font-size: ${props => props.fontSize || '16px'};
  color: var(--color-main);
`


export default Text
