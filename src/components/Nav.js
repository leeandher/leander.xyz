import React from "react"
import styled from "styled-components"

import NavLink from "./NavLink"
import Toggler from "./Toggler"

const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  text-align: center;
  background: ${({ theme }) => theme.shade.darkest};
  @media (max-width: 850px) {
    background: ${({ theme }) => theme.shade.darker};
    border-right: 2px solid ${({ theme }) => theme.shade.lighter};
    opacity: 0.9;
    color: red;
    top: 0;
    bottom: 0;
    right: calc(100% - 200px);
    flex-flow: column;
    justify-content: flex-start;
    ${({ showSideBar }) => {
      if (!showSideBar) {
        return `
          transform: translateX(-100%);
          overflow: hidden;
        `
      }
    }};
  }
`

const Nav = ({ handleToggle, showSideBar }) => {
  return (
    <>
      <StyledNav showSideBar={showSideBar || false}>
        <NavLink to="/">
          <span>LOGO</span>
        </NavLink>
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
