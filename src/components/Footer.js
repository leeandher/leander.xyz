import React from "react"
import styled from "styled-components"
import Spring from "react-spring/renderprops"

import { getCopyrightYearsFrom } from "../helpers/copyrightDate"

import {
  FaGithub,
  FaStackOverflow,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa"

const StyledFooter = styled.footer`
  height: 50vh;
  padding: 5rem;
  color: ${({ theme }) => theme.shade.lighter};
  display: flex;
  flex-direction: column;
  text-align: center;
  h5 {
    font-size: 3rem;
    font-weight: 400;
    margin: 0;
    flex: 1;
  }
  p {
    text-align: center;
    font-style: italic;
    color: ${({ theme }) => theme.shade.mid};
    margin: 1rem;
    a {
      color: ${({ theme }) => theme.accent};
      &:hover {
        text-decoration: underline ${({ theme }) => theme.accent};
        color: ${({ theme }) => theme.shade.mid};
      }
    }
    flex: 1;
  }
  svg {
    ${({ theme }) => theme.transition.default("all")};
    box-sizing: content-box;
    font-size: 4rem;
    border-radius: 1rem;
    margin: 2rem;
    border: 2px solid transparent;
    padding: 1rem;
    line-height: 1;
    &:hover {
      border-color: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.accent};
    }
  }
`

const IconWrapper = styled.div`
  margin: 0 auto;
  flex: 1;
`

const Footer = ({ handleToggle, showSideBar }) => {
  const copyrightYears = getCopyrightYearsFrom(2019)
  return (
    <StyledFooter>
      <h5>Find me online</h5>
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
      <p>I like easter eggs.</p>
      <p>
        © Copyright {copyrightYears}, but don't worry, I'm{" "}
        <a href="https://github.com/leeandher/leander.xyz">open source</a>{" "}
      </p>
    </StyledFooter>
  )
}

export default Footer
