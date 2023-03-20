import styled from 'styled-components';


type TInputProps = {
  width?: string,
  height?: string,
}

const Input = styled.input<TInputProps>`
  width: ${props => props.width || '70%'};
  height: ${props => props.height || '30px'};
  font-family: var(--font-main);
  font-size: 16px;
  color: var(--color-main);
  background: var(--color-fade);
  border: 1px solid var(--color-main);
  outline: none;

  &:focus-visible {
    border-color: var(--color-accent);
  }
`


export default Input
