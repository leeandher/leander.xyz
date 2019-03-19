import React from "react"
import styled from "styled-components"

import {
  FaGithub,
  FaStackOverflow,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa"

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.shade.darker};
  height: 50vh;
  h1 {
    color: red;
  }
`

const Footer = ({ handleToggle, showSideBar }) => {
  return (
    <StyledFooter>
      <h1>
        HOW IS IT GOING
        <a href="https://github.com/leeandher">
          <FaGithub />
        </a>
        <a href="https://stackoverflow.com/users/story/10996907?view=Timeline">
          <FaStackOverflow />
        </a>
        <a href="https://twitter.com/LeeAndHer">
          <FaTwitter />
        </a>
        <a href="https://www.linkedin.com/in/leander-rodrigues/">
          <FaLinkedin />
        </a>
      </h1>
    </StyledFooter>
  )
}

export default Footer
