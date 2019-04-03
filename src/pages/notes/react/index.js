import React from "react"
import styled from "styled-components"

import Page from "../../../components/Page"

const StyledHeader = styled.header`
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.default};
  background: transparent;
  color: ${({ theme }) => theme.shade.lighter};
  div {
  }
  .acc {
    color: ${({ theme }) => theme.accent};
  }
  h1 {
    margin: 15px;
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
`

const StyledSection = styled.section`
  background: ${({ theme }) => theme.shade.light};
  width: 95%;
  margin: 0 auto;
  border-radius: 0.5rem;
  border: 5px solid ${({ theme }) => theme.accent};
  padding: 15px;
  h2 {
    text-align: center;
    text-decoration: underline ${({ theme }) => theme.accent};
  }
`

const Home = () => {
  return (
    <Page
      accent="teal"
      title="Welcome to leander.xyz!"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <StyledHeader>
        <div>
          <p>Hi there, My name is</p>
          <h1>
            <span>REACT</span>
          </h1>
          <p>and I'd probably describe myself as</p>
        </div>
      </StyledHeader>
      <StyledSection>
        <h2>Who are you again?</h2>
      </StyledSection>
    </Page>
  )
}

export default Home
