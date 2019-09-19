import React from "react"
import styled from "styled-components"

import { media, themer } from "../styles/helpers"

const Header = styled.header`
  min-height: ${({ height }) => height || "100vh"};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${themer("spacing.default")};
  color: ${themer("shade.lighter")};
  h1 {
    ${media.tablet`
      font-size: 4.5rem;
    `}
    ${media.phone`
      font-size: 3.5rem;
    `}
    margin: 15px;
    transform: skew(-5deg);
    display: inline-block;
    padding: 10px;
    background: ${themer("accent")};
    color: ${themer("shade.darkest")};
    ${({ theme }) => theme.transition.default("all")};
    &:hover {
      ${({ expanding }) => (expanding ? "letter-spacing: 0.5rem;" : "")}
    }
  }
  p {
    font-size: 2rem;
    margin: 0;
  }
`

const Hero = ({ children, ...props }) => (
  <Header {...props}>
    <div>{children}</div>
  </Header>
)

export default Hero
