import styled from 'styled-components';


type TInputProps = {
  width?: string,
  height?: string,
}

const Input = styled.input<TInputProps>`
  width: ${props => props.width || '60%'};
  height: ${props => props.height || '30px'};
  font-family: var(--font-main);
  font-size: 16px;
  color: var(--color-main);
  background: var(--color-fade);
  border: none;
  outline: none;
  box-shadow: 0;
  transition: all ease-out 0.1s;

  &:focus-visible {
    box-shadow: 0 0 0 1px var(--color-accent);
  }
`


export default Input
