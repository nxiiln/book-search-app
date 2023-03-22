import styled from 'styled-components'


type TButtonProps = {
  width?: string,
  height?: string,
  margin?: string,
}

const Button = styled.button<TButtonProps>`
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '30px'};
  margin: ${props => props.margin};
  font-family: var(--font-main);
  font-size: 16px;
  color: var(--color-main);
  background: var(--color-fade);
  border: none;
  outline: none;
  cursor: pointer;
  transition: all ease-out 0.2s;

  &:hover, &:focus-visible {
    background: var(--color-accent);
    transform: scale(1.07);
  }

  &:active {
    background: var(--color-accent-second);
  }
`


export default Button
