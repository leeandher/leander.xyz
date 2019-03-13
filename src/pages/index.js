import React from "react"
import styled from "styled-components"
import Typing from "react-typing-animation"

import Page from "../components/Page.js"
import Nav from "../components/Nav.js"

import { descriptors } from "../data/descriptors.json"

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
  h2 {
    font-size: 3rem;
  }
`
const StyledTyping = styled(Typing).attrs({ cursorClassName: "acc" })`
  min-height: 45px;
  span {
    text-decoration: underline ${({ theme }) => theme.accent};
  }
`

const Home = () => {
  return (
    <Page accent="teal">
      <Nav />
      <StyledHeader>
        <p>Hi there, My name is</p>
        <h1>
          <span>Leander Rodrigues</span>
        </h1>
        <p>and I'd probably describe myself as</p>
        <h2>
          <StyledTyping>
            {descriptors.map((str, i, arr) => (
              <React.Fragment key={str}>
                <span>{str}</span>
                <Typing.Backspace
                  count={i === arr.length - 1 ? 4 : str.length}
                  delay={1250}
                />
              </React.Fragment>
            ))}
          </StyledTyping>
        </h2>
      </StyledHeader>
      <section>
        <h2>About Me</h2>
        {/* FLEXBOX */}
      </section>
    </Page>
  )
}

export default Home
