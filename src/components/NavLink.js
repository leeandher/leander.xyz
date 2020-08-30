import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"

import { themer } from "../styles/helpers"

export const linkStyles = css`
  padding: ${themer("spacing.default")};
  flex: 1;
  font-weight: bold;
  font-size: 2rem;
  position: relative;
  color: ${themer("shade.lighter")};
  ${({ theme }) => theme.transition.default("color")};
  transform: translateX(-5px);
  &:first-child {
    flex: 2;
  }
  @media (max-width: 850px) {
    flex: 0;
    text-align: left;
    border-left: 5px solid
      ${({ theme, accent }) => (accent ? theme.color[accent] : theme.accent)};
    &:first-child {
      flex: 0;
    }
  }
  &:after {
    z-index: -1;
    height: 3px;
    background: ${({ theme, accent }) =>
      accent ? theme.color[accent] : theme.accent};
    content: "";
    width: 0px;
    position: absolute;
    transform: translateX(-50%);
    top: 50%;
    left: 50%;
    ${({ theme }) => theme.transition.default("width")};
    margin-top: 2.5rem;
    @media (max-width: 850px) {
      top: 0;
      left: 0;
      margin-top: 0;
      height: 60px;
    }
  }
  &:hover,
  &:focus {
    color: ${({ theme, accent }) =>
      accent ? theme.color[accent] : theme.accent};
    &:after {
      width: calc(100% - 60px);
    }
    @media (max-width: 850px) {
      color: ${themer("shade.darker")};
      color: black !important;
      &:after {
        transition: all 0.4s ease;
        transform: translateX(0);

        width: 100%;
      }
    }
  }
`
const StyledLink = styled(Link)`
  ${linkStyles}
`
const StyledAnchorLink = styled.a`
  ${linkStyles}
`

const NavLink = ({ children, isExternal, to, ...props }) =>
  isExternal ? (
    <StyledAnchorLink href={to} {...props}>
      {children}
    </StyledAnchorLink>
  ) : (
    <StyledLink to={to} {...props}>
      {children}
    </StyledLink>
  )

export default NavLink
