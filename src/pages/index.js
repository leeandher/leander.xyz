import React from "react"
import styled from "styled-components"

import Page from "../components/Page.js"

const StyledHeader = styled.header`
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-weight: 300;
  padding: ${({ theme }) => theme.spacing.default};
  background: ${({ theme }) => theme.shade.darkest};
  color: ${({ theme }) => theme.shade.lighter};
  span {
    color: ${({ theme }) => theme.accent};
  }
`

const Home = () => {
  return (
    <Page accent="teal">
      <StyledHeader>
        <h1>
          Hi there, My name is <span>Leander Rodrigues</span>
        </h1>
        <h1>
          I'm a <span>//TYPER</span>
        </h1>
      </StyledHeader>
      <section>
        <h2>About Me</h2>
        {/* FLEXBOX */}
        <pre>
          {`const Leander = {\n  age: 20, \n  school: 'University of Waterloo',\n  program: 'Nanotechnology Engineering',\n}`}
        </pre>
      </section>
    </Page>
  )
}

export default Home
