import React from "react"
import { Link } from "gatsby"

import styled from "styled-components"

/* v1: Grey borders
const StyledLink = styled(Link)`
  padding: ${({ theme }) => theme.spacing.default};
  flex: 1;
  box-shadow: 0 0 15px inset transparent;
  font-weight: bold;
  font-size: 2rem;
  border: 1px solid ${({ theme }) => theme.shade.darker};
  border: 0 1px 1px 0;
  ${({ theme }) => theme.transition.default("all")};
  &:hover {
    box-shadow: 0 0 15px 4px inset
      ${({ theme, accent }) => (accent ? theme.color[accent] : theme.accent)};
  }
  &:first-child {
    flex: 2;
    border-left: 0;
  }
`
*/

const StyledLink = styled(Link)`
  padding: ${({ theme }) => theme.spacing.default};
  flex: 1;
  font-weight: bold;
  font-size: 2rem;
  position: relative;
  color: ${({ theme }) => theme.shade.lighter};
  ${({ theme }) => theme.transition.default("all")};

  &:after {
    height: 3px;
    background: ${({ theme, accent }) =>
      accent ? theme.color[accent] : theme.accent};
    content: "";
    width: 0;
    position: absolute;
    transform: translateX(-50%);
    top: 50%;
    left: 50%;
    ${({ theme }) => theme.transition.default("all")};
    margin-top: 2.5rem;
  }
  &:hover,
  &:focus {
    color: ${({ theme, accent }) =>
      accent ? theme.color[accent] : theme.accent};
    &:after {
      width: calc(100% - 60px);
    }
    @media (max-width: 700px) {
      width: calc(100% - 10px);
    }
  }
  &:first-child {
    flex: 2;
  }
`

const NavLink = ({ accent, children, to }) => (
  <StyledLink to={to} accent={accent}>
    {children}
  </StyledLink>
)

export default NavLink
