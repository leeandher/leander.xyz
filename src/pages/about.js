import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Hero from "../components/Hero"
import Page from "../components/Page"
import MainWrapper from "../components/MainWrapper"
import { Default, Skewed } from "../components/PageSections"

import FAQ from "../components/page-specific/About/FAQ"
import SuperItem from "../components/page-specific/About/SuperItem"

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
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem 2rem;
`

const About = ({ data }) => {
  const { allMarkdownRemark } = data
  const { nodes: faqs } = allMarkdownRemark
  return (
    <Page accent="red" bgDesign="snow" seoProfile="about-page">
      <Hero expanding height="50vh">
        <h1>All About Me</h1>
      </Hero>
      <HeyThere skew="-4deg">
        <h2 className="title">Hey there!</h2>
        <MainWrapper>
          <p>
            asfdasdfa sdfa sdf asdfa sdfa sdfas dflorem Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Iusto, non sunt cum nobis
            doloribus asperiores neque amet omnis placeat et numquam aut nihil
            hic, voluptates cupiditate accusantium ex! Placeat numquam laborum
            iste fuga, esse voluptas illum? Optio necessitatibus culpa nobis.s
          </p>
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
          <SuperWrapper>
            <SuperItem labelText="Favourite Language" revealText="JavaScript" />
            <SuperItem labelText="Favourite Editor" revealText="VS Code" />
            <SuperItem labelText="Favourite Board Game" revealText="Coup" />
            <SuperItem
              labelText="Favourite Nerdy Board Game"
              revealText="Welcome To..."
            />
            <SuperItem
              labelText="Favourite Nerdy Video Game"
              revealText="Kingdom Hearts BBS"
            />
            <SuperItem
              labelText="Favourite Video Game"
              revealText="Borderlands"
            />
            <SuperItem labelText="Favourite Stark" revealText="Arya" />
            <SuperItem
              labelText="Favourite Board Game"
              revealText="JavaScript"
            />
            <SuperItem
              labelText="Favourite Board Game"
              revealText="JavaScript"
            />

            <SuperItem
              labelText="Favourite Board Game"
              revealText="JavaScript"
            />
            <SuperItem labelText="Favourite Language" revealText="JavaScript" />
          </SuperWrapper>
        </MainWrapper>
      </Superlatives>
      <Questions skew="4deg">
        <MainWrapper maxWidth="960px">
          <h2 className="title">FAQs</h2>
          <h3 className="subtitle">
            ( People don't actually ask these,
            <br />
            this is just where I talk about myself )
          </h3>
          {faqs.map(({ html, frontmatter }) => (
            <FAQ question={frontmatter.question} key={frontmatter.question}>
              <span dangerouslySetInnerHTML={{ __html: html }} />
            </FAQ>
          ))}
        </MainWrapper>
      </Questions>
    </Page>
  )
}

export default About

export const faQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "faq" } } }) {
      nodes {
        html
        frontmatter {
          question
        }
      }
    }
  }
`
