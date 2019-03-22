import styled from "styled-components"

const Button = styled.button`
  outline: 0;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.accent.darker};
  border: 0;
  box-shadow: 0 -3px ${({ theme }) => theme.accent} inset;
  color: ${({ theme }) => theme.shade.darker};
  padding: 1rem 1.5rem;
  font-weight: 700;
  background: transparent;
  position: relative;

  &:before {
    content: "";
    height: 100%;
    max-height: 0;
    z-index: -1;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: ${({ theme }) => theme.accent};
    transition: 0.2s ease max-height;
  }
  margin: 1rem;
  ${({ theme }) => theme.transition.default("color, box-shadow")};
  &:focus,
  &:hover {
    cursor: pointer;
    &:before {
      max-height: 100%;
    }
  }
`

export default Button
