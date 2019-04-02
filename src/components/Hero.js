import React from "react"
import styled from "styled-components"

const Header = styled.header`
  min-height: ${({ height }) => height || "100vh"};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.default};
  color: ${({ theme }) => theme.shade.lighter};
  h1 {
    margin: 15px;
    transform: skew(-5deg);
    display: inline-block;
    padding: 10px;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.shade.darkest};
    box-shadow: 7px 0 0 3px ${({ theme }) => theme.accent},
      -7px 0 0 3px ${({ theme }) => theme.accent};
  }
  p {
    font-size: 2rem;
    margin: 0;
  }
`

const Hero = ({ children, height }) => (
  <Header height={height}>
    <div>{children}</div>
  </Header>
)

export default Hero
