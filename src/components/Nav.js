import React from "react"
import styled from "styled-components"

import NavLink from "./NavLink"

const StyledNav = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  text-align: center;
`

const Nav = () => {
  return (
    <StyledNav>
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
  )
}

export default Nav
