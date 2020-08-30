import React from "react"
import styled from "styled-components"
import marked from "marked"

import Hero from "../components/Hero"
import Page from "../components/Page"
import MainWrapper from "../components/MainWrapper"
import { Default, Skewed } from "../components/PageSections"

import FAQ from "../components/page-specific/About/FAQ"
import SuperItem from "../components/page-specific/About/SuperItem"

import aboutData from "../data/about.json"

import { themer } from "../styles/helpers"

const Questions = styled(Skewed)`
  padding: 10rem 0 3rem 0;
  margin: 10rem 0;
  &:before {
    background: ${themer("shade.lightest")};
  }
`

const HeyThere = styled(Skewed)`
  padding: 3rem 0 15rem;
  margin: 10rem 0;
  &:before {
    background: ${themer("shade.lightest")};
  }
`

const Superlatives = styled(Default)`
  color: ${themer("shade.lightest")};
  mark {
    padding: 0.5rem;
    color: ${themer("shade.lightest")};
  }
`

const SuperWrapper = styled(MainWrapper)`
  display: grid;
  padding: 0;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem 2rem;
`

const About = () => {
  return (
    <Page accentKey="red" bgDesign="snow" seoProfile="about-page">
      <Hero expanding height="50vh">
        <h1>All About Me</h1>
      </Hero>
      <HeyThere skew="-4deg">
        <h2 className="title">Hey there!</h2>
        <MainWrapper>
          <p
            className="markdown"
            dangerouslySetInnerHTML={{ __html: marked(aboutData.helloText) }}
          />
        </MainWrapper>
      </HeyThere>
      <Superlatives>
        <h2 className="title">The 🔥 Picks</h2>
        <MainWrapper>
          <p>
            Everyone has a list of the things they like more than the other
            things they like. Here is where you'll find mine. I pick the
            categories at random, and don't really structure what goes on here,
            but they're fun little nuggets of info by which you can ruthlessly
            judge me!
          </p>
          <p>
            These 🔥 picks are always changing, so if you think I'm wrong about
            any of these, I'm probably on your side, and I'll update it ASAP.
          </p>
          <p>
            <mark>
              If we disagree, that's fine, this is my website, so I'll probably
              win 👌😎.
            </mark>
          </p>
        </MainWrapper>
        <SuperWrapper>
          {aboutData.picks.map(({ label, value }, i) => (
            <SuperItem label={label} value={value} key={i} />
          ))}
        </SuperWrapper>
      </Superlatives>
      <Questions skew="4deg">
        <MainWrapper maxWidth="960px">
          <h2 className="title">FAQs</h2>
          <h3 className="subtitle">
            ( People don't actually ask these,
            <br />
            this is just where I talk about myself )
          </h3>
          {aboutData.faqs.map(({ question, answer }, i) => (
            <FAQ question={question} key={i}>
              <span dangerouslySetInnerHTML={{ __html: marked(answer) }} />
            </FAQ>
          ))}
        </MainWrapper>
      </Questions>
    </Page>
  )
}

export default About
