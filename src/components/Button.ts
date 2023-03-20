import styled from 'styled-components';


type TButtonProps = {
  width?: string,
  height?: string,
}

const Button = styled.button<TButtonProps>`
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '30px'};
  font-family: var(--font-main);
  font-size: 16px;
  color: var(--color-main);
  background: var(--color-fade);
  border: 1px solid var(--color-main);
  outline: none;
  cursor: pointer;

  &:hover, &:focus-visible {
    background: var(--color-accent);
  }

  &:active {
    background: var(--color-accent-second);
  }
`


export default Button
