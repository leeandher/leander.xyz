import React from "react"
import styled from "styled-components"
import Typist from "react-typist"
import { Link } from "gatsby"

import Page from "../components/Page.js"
import QuoteCard from "../components/QuoteCard.js"

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
    font-family: monospace;
  }
  .Cursor {
    color: ${({ theme }) => theme.accent};
    width: 0px;
    display: inline-block;
    text-decoration: none;
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
  opacity: 0.9;
  padding: 15px;
  h2 {
    text-align: center;
    text-decoration: underline ${({ theme }) => theme.accent};
  }
`

const PanelWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 1250px;
  margin: 0 auto;
`

const Home = () => {
  return (
    <Page
      accent="teal"
      accentBg
      title="Welcome to leander.xyz!"
      design="mesh"
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
        <h2>"Who are you again?"</h2>
        <p>
          Hey there, and welcome to my corner of the internet! I've got
          everything you need, all in one place (so long as "what you need" is
          dorky blog posts, programming notes, and some nerd's resume. )
        </p>
        <Link to="/about">More about me</Link>
      </StyledSection>
      <br />
      <StyledSection>
        <h2>"So, what do you do again?"</h2>
        <h3>Well I guess that depends on what you'd like to see?</h3>
        <PanelWrapper>
          <QuoteCard
            accent="orange"
            preText="Got any"
            mainText="PROJECTS"
            to="/projects"
          />
          <QuoteCard
            accent="yellow"
            preText="Show me some"
            mainText="BLOG POSTS"
            to="/blog"
          />
          <QuoteCard
            accent="green"
            preText="I'd like to read your"
            mainText="NOTES"
            to="/notes"
          />
          <QuoteCard
            accent="blue"
            preText="I want to see"
            mainText="EVERYTHING"
            to="/resume"
          />
        </PanelWrapper>
      </StyledSection>
    </Page>
  )
}

export default Home
