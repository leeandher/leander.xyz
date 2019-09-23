import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

import NavLink from "./NavLink"
import Toggler from "./Toggler"
import Logo from "./icons/Logo"

import { themer } from "../styles/helpers"

const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  text-align: center;
  background: ${themer("shade.darkest")};
  font-size: 20px;
  @media (max-width: 850px) {
    background: ${themer("shade.darker")};
    border-right: 2px solid ${themer("shade.lighter")};
    opacity: 0.9;
    color: red;
    top: 0;
    border-left: 3px solid ${themer("shade.lighter")};
    bottom: 0;
    right: calc(100% - 200px);
    flex-flow: column;
    justify-content: flex-start;
    transform: translateX(0%);
    transition: transform 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
    ${({ showSideBar }) => {
      if (!showSideBar) {
        return css`
          transform: translateX(-100%);
          overflow: hidden;
        `
      }
    }};
  }
`

const StyledLogo = styled(Logo)`
  padding: 1rem;
  margin: 0 3rem;
`

const Nav = ({ accent, handleToggle, showSideBar }) => {
  return (
    <>
      <StyledNav showSideBar={showSideBar || false}>
        <Link to="/">
          <StyledLogo accent={accent} size={60} />
        </Link>
        <NavLink to="/about" accent="red">
          <span>About</span>
        </NavLink>
        <NavLink to="/projects" accent="orange">
          <span>Projects</span>
        </NavLink>
        <NavLink to="/blog" accent="yellow">
          <span>Blog</span>
        </NavLink>
        <NavLink to="/notes" accent="green">
          <span>Notes</span>
        </NavLink>
        <NavLink to="/resume" accent="blue">
          <span>Resume</span>
        </NavLink>
        <NavLink to="/contact" accent="purple">
          <span>Contact</span>
        </NavLink>
      </StyledNav>
      <Toggler showSideBar={showSideBar || false} handleToggle={handleToggle} />
    </>
  )
}

export default Nav
