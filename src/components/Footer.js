import React from "react"
import styled from "styled-components"
import Spring from "react-spring/renderprops"

import {
  FaGithub,
  FaStackOverflow,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa"
import { getCopyrightYearsFrom } from "../helpers"
import AnchorLink from "./AnchorLink"
import Button from "./Button"

const StyledFooter = styled.footer`
  height: 50vh;
  padding: 5rem;
  color: ${({ theme }) => theme.shade.lighter};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  h5 {
    font-weight: 400;
    margin: 0;
    flex: 1;
  }
  p {
    font-size: 1.5rem;
    text-align: center;
    font-style: italic;
    color: ${({ theme }) => theme.shade.mid};
    margin-bottom: 3rem;
    flex: 1;
  }
  button {
    margin: 3rem;
  }
  svg {
    color: ${({ theme }) => theme.shade.lightest};
    box-sizing: content-box;
    font-size: 4rem;
    padding: 0.5rem;
    padding-bottom: calc(0.5rem - 3px);
    line-height: 1;
  }
  small,
  small a {
    font-size: 1.25rem;
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
      <div>
        <h5>Find me online</h5>
        <IconWrapper>
          <Button>
            <a
              href="https://www.linkedin.com/in/leander-rodrigues/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </Button>
          <Button>
            <a
              href="https://github.com/leeandher"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </Button>
          <Button>
            <a
              href="https://stackoverflow.com/users/story/10996907?view=Timeline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaStackOverflow />
            </a>
          </Button>
          <Button>
            <a
              href="https://twitter.com/LeeAndHer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </Button>
        </IconWrapper>
        <p>
          &copy; Copyright {copyrightYears}, <br />
          but don't worry, I'm{" "}
          <AnchorLink
            href="https://github.com/leeandher/leander.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            open source
          </AnchorLink>
        </p>
      </div>
      <small>
        I like{" "}
        <AnchorLink
          href="https://github.com/leeandher/leander.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          easter eggs.
        </AnchorLink>
      </small>
    </StyledFooter>
  )
}

export default Footer
