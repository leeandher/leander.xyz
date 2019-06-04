import { Link } from "gatsby"
import styled from "styled-components"

const InnerLink = styled(Link)`
  outline: 0;
  text-align: center;
  border: 0;
  box-shadow: 0 -3px ${({ theme }) => theme.accent} inset;
  color: ${({ theme }) => theme.shade.lightest};
  font-family: ${({ theme }) => theme.font.mono};
  padding: 1rem 1.5rem;
  font-weight: 700;
  background: transparent;
  position: relative;
  display: inline-block;
  margin: 1rem;
  z-index: 1;
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
  &:focus,
  &:hover {
    cursor: ${({ disabled }) => (disabled ? "disabled" : "pointer")};
    &:before {
      max-height: ${({ disabled }) => (disabled ? "0" : "100")}%;
    }
  }
`

export default InnerLink
