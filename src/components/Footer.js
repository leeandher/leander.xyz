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
  p {
    color: red;
  }
  svg {
    ${({ theme }) => theme.transition.default("all")};
    box-sizing: content-box;
    font-size: 7.5rem;
    margin: 1.5rem;
    border: 2px solid red;
    padding: 1rem;
    line-height: 1;
    &:hover {
      padding: 1.5rem;
      margin: 1rem;
    }
  }
`

const IconWrapper = styled.div`
  margin: 0 auto;
`

const Footer = ({ handleToggle, showSideBar }) => {
  return (
    <StyledFooter>
      <p>HOW IS IT GOING</p>
      <IconWrapper>
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
      </IconWrapper>
    </StyledFooter>
  )
}

export default Footer
