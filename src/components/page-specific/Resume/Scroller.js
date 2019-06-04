import React from "react"
import styled from "styled-components"

import { media, themer } from "../../../styles/helpers"

const ScrollWrapper = styled.aside`
  color: ${themer("shade.lightest")};
  margin: 2rem 1rem;
  ${media.desktop`
    display: none;
  `}
  .links {
    position: sticky;
    top: ${themer("constants.navBarHeight")};
    padding-top: 1rem;
  }
  .page-link {
    display: block;
    font-size: 1.5rem;
    margin: 1.5rem 1rem;
    margin-left: 2rem;
    padding-left: 0.5rem;
    font-weight: 300;
    position: relative;
    &:before {
      content: "# ";
      position: absolute;
      right: 100%;
      font-weight: bold;
      top: 0;
      color: ${themer("accent")};
    }
    &:hover {
      text-decoration: underline ${themer("accent")};
    }
  }
`

const Scroller = () => (
  <ScrollWrapper>
    <div className="links">
      <a className="page-link" href="#summary-of-qualifications">
        Summary of Qualifications
      </a>
      <a className="page-link" href="#character-sheet">
        Character Sheet
      </a>
      <a className="page-link" href="#work-experience">
        Work Experience
      </a>
      <a className="page-link" href="#education">
        Education
      </a>
      <a className="page-link" href="#project-showcase">
        Project Showcase
      </a>
      <a className="page-link" href="#volunteer-experience">
        Voluneer Experience
      </a>
      <a className="page-link" href="#achievements">
        Acheivements
      </a>
      <a className="page-link" href="#weird-stuff">
        Weird Stuff
      </a>
    </div>
  </ScrollWrapper>
)

export default Scroller
