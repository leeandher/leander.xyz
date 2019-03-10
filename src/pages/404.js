import React from "react"
import styled from "styled-components"

import Page from "../components/Page.js"

const StyledHeader = styled.header`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.default};
  background: ${({ theme }) => theme.shade.darkest};
  color: ${({ theme }) => theme.shade.lighter};
  .acc {
    color: ${({ theme }) => theme.accent};
  }
  h1 {
    margin: 15px;
    font-size: 5rem;
    transform: skew(-5deg);
    display: inline-block;
    span {
      padding: 10px;
      background: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.shade.darkest};
    }
  }
  p {
    font-size: 2rem;
    margin: 0;
  }
  h2,
  a {
    font-size: 3rem;
    text-decoration: underline ${({ theme }) => theme.accent};
    a {
      color: inherit;
    }
  }
`
const Home = () => {
  return (
    <Page accent="teal">
      <StyledHeader>
        <p>Hi there, My name is</p>
        <h1>
          <span>Leander Rodrigues</span>
        </h1>
        <p>and I'm currently hard at work rebuilding my site.</p>
        <br />
        <h2>
          <a href="https://github.com/leeandher">Check out my GitHub</a>
        </h2>
        <p>to see my latest projects!</p>
      </StyledHeader>
    </Page>
  )
}

export default Home
