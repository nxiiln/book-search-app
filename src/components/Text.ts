import styled from 'styled-components'


type TTextProps = {
  fontSize?: string,
  fontWeight?: number,
  textAlign?: string,
}

const Text = styled.span<TTextProps>`
  font-family: var(--font-main);
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 400};
  text-align: ${props => props.textAlign || 'start'};
  color: var(--color-main);
`


export default Text
