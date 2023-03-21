import styled from 'styled-components';

type TTextProps = {
  fontSize?: string,
  textAlign?: string,
}

const Text = styled.span<TTextProps>`
  font-family: var(--font-main);
  font-size: ${props => props.fontSize || '16px'};
  text-align: ${props => props.textAlign || 'start'};
  color: var(--color-main);
`


export default Text
