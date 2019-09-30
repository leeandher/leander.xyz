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

const Scroller = ({ children }) => <ScrollWrapper>{children}</ScrollWrapper>

export default Scroller
