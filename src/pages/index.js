import React from "react"
import styled from "styled-components"
import Typist from "react-typist"
import { Link } from "gatsby"

import Page from "../components/Page.js"

import { descriptors } from "../data/descriptors.json"

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
const StyledTyping = styled(Typist).attrs({
  cursor: {
    hideWhenDone: true,
    hideWhenDoneDelay: 2000,
  },
})`
  min-height: 45px;
  span {
    text-decoration: underline ${({ theme }) => theme.accent};
  }
  .Cursor {
    color: ${({ theme }) => theme.accent};
    width: 0px;
    display: inline-block;
    margin-left: 3px;
    opacity: 1;
    animation: blink 0.5s step-end infinite;
    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`

const StyledSection = styled.section`
  background: ${({ theme }) => theme.shade.light};
  padding: 15px;
  h2 {
    text-align: center;
    text-decoration: underline ${({ theme }) => theme.accent};
  }
`

const StyledPanel = styled(Link)`
  flex: 1;
  text-align: center;
  p {
  }
  h4 {
    font-size: 4rem;
    font-weight: bold;
  }
`

const PanelWrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.shade.mid};
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
            <span>Leander Rodrigues</span>
          </h1>
          <p>and I'd probably describe myself as</p>
          <h2>
            <StyledTyping>
              {descriptors.map((str, i, arr) => (
                <span key={str}>
                  <span>{str}</span>
                  <Typist.Backspace
                    count={i === arr.length - 1 ? 4 : str.length}
                    delay={1250}
                  />
                </span>
              ))}
            </StyledTyping>
          </h2>
        </div>
      </StyledHeader>
      <StyledSection>
        <h2>Who are you again?</h2>
        <Link to="/about">More about me</Link>
      </StyledSection>
      <br />
      <StyledSection>
        <h2>So, what do you do again?</h2>
        <h3>Well I guess that depends on what you'd like to see?</h3>
        <PanelWrapper>
          <StyledPanel to="/projects">
            <p>Got any</p>
            <h4>PROJECTS</h4>
          </StyledPanel>
          <StyledPanel to="/notes">
            <p>I'd like to read your</p>
            <h4>NOTES</h4>
          </StyledPanel>
          <StyledPanel to="/blog">
            <p>Show me some</p>
            <h4>BLOG POSTS</h4>
          </StyledPanel>
          <StyledPanel to="/resume">
            <p>I want to see</p>
            <h4>EVERYTHING</h4>
          </StyledPanel>
        </PanelWrapper>
      </StyledSection>
    </Page>
  )
}

export default Home
