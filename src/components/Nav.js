import React from "react"
import { Link } from "gatsby"

import styled from "styled-components"

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <a>Home</a>
      </Link>
      <Link to="/about">
        <a>About</a>
      </Link>
      <Link to="/notes">
        <a>Projects</a>
      </Link>
      <Link to="/projects">
        <a>Projects</a>
      </Link>
      <Link to="/blog">
        <a>Home</a>
      </Link>
      <Link to="/resume">
        <a>Resume</a>
      </Link>
    </nav>
  )
}

export default Nav
