import React from "react"
import styled from "styled-components"

import Hero from "../components/Hero"
import Page from "../components/Page"
import { Skewed } from "../components/PageSections"
import FAQ from "../components/FAQ"

import questions from "../data/questions.json"

const Questions = styled(Skewed)`
  padding: 10rem 0 3rem 0;
  margin: 10rem 0;
  &:before {
    background: ${({ theme }) => theme.shade.lightest};
  }
  button {
    display: block;
    margin: 1rem auto;
    margin-top: 4rem;
  }
`

const About = () => {
  return (
    <Page
      accent="red"
      accentBg
      title="me, me, mE, ME, ME!"
      design="snow"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <Hero height="50vh">
        <h1>All About Me</h1>
      </Hero>
      <Questions skew="4deg">
        <h2>FAQs</h2>
        <h3>
          ( People don't actually ask these,
          <br />
          this is just where I talk about myself )
        </h3>
        {questions.map(({ question, answer }) => {
          console.log(question, answer)
          return <FAQ question={question} answer={answer} />
        })}
      </Questions>
    </Page>
  )
}

export default About
