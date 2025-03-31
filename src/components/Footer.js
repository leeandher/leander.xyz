import React from "react"
import styled from "styled-components"
import { FaGithub, FaLinkedin } from "react-icons/fa"

import { getCopyrightYearsFrom } from "../helpers"
import AnchorLink from "./AnchorLink"

import { themer } from "../styles/helpers"

const StyledAnchorLink = styled(AnchorLink)`
  display: inline-block;
  padding: 1.75rem;
  margin: 2rem;
`

const StyledFooter = styled.footer`
  padding: 5rem;
  color: ${themer("shade.lighter")};
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
    color: ${themer("shade.mid")};
    margin-bottom: 3rem;
    flex: 1;
  }
  button {
    margin: 3rem;
  }
  svg {
    color: ${themer("shade.lightest")};
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

const Easter = styled.small`
  text-align: right;
`

const Footer = ({ handleToggle, showSideBar }) => {
  const copyrightYears = getCopyrightYearsFrom(2019)
  return (
    <StyledFooter>
      <h5>Find me online</h5>
      <IconWrapper>
        <StyledAnchorLink
          href="https://github.com/leeandher"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </StyledAnchorLink>
        <StyledAnchorLink
          href="https://www.linkedin.com/in/leander-rodrigues/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </StyledAnchorLink>
      </IconWrapper>
      <p>
        &copy; Copyright {copyrightYears} <br />
        but don't worry, I'm{" "}
        <AnchorLink
          href="https://github.com/leeandher/leander.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          open source
        </AnchorLink>
      </p>
      <small>
        <AnchorLink
          href="https://github.com/leeandher/leander.xyz/issues/new?assignees=leeandher&labels=%F0%9F%90%9B+bug&template=bug_report.md&title=%F0%9F%90%9B+%5BBUG%5D"
          target="_blank"
          rel="noopener noreferrer"
        >
          See a bug?
        </AnchorLink>
      </small>
      <Easter>
        <AnchorLink
          href="https://en.wikipedia.org/wiki/Konami_Code"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span role="img" aria-label="easter egg">
            🥚
          </span>
        </AnchorLink>
      </Easter>
    </StyledFooter>
  )
}

export default Footer
