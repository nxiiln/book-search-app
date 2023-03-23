import styled from 'styled-components'


const Select = styled.select`
  width: 100px;
  height: 30px;
  font-family: var(--font-main);
  font-size: 16px;
  color: var(--color-main);
  background: var(--color-fade);
  border: none;
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: all ease-out 0.2s;

  &:hover, &:focus-visible {
    background: var(--color-accent);
    transform: scale(1.07);
  }

  & > option {
    font-family: var(--font-main);
    font-size: 16px;
    color: var(--color-main);
    background: var(--color-fade);
    cursor: pointer;
  }
`


export default Select
