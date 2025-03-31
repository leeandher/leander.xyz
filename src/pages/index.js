import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import marked from "marked"

import Button from "../components/Button"
import Hero from "../components/Hero"
import Page from "../components/Page"
import Carousel from "../components/Carousel"
import ShowItem from "../components/ShowItem"
import MainWrapper from "../components/MainWrapper"
import { Default, Skewed } from "../components/PageSections"

import Typer from "../components/page-specific/Home/Typer"
import QuoteCard from "../components/page-specific/Home/QuoteCard"

import { themer } from "../styles/helpers"

import homeData from "../data/home.json"

const MainHero = styled(Hero)`
  margin-top: -${themer("constants.navBarHeight")};
`

const Introduction = styled(Skewed)`
  padding: 10rem 0 3rem 0;
  margin: 10rem 0;
  &:before {
    background: ${themer("shade.lightest")};
  }
  button {
    display: block;
    margin: 1rem auto;
    margin-top: 4rem;
  }
  .self-description {
    a {
      position: relative;
      &:before {
        ${themer("before")}
        background: ${themer("accent")};
        height: 20%;
        top: 85%;
      }
    }
    pre {
      overflow-x: auto;
      padding: 0.75rem;
      border-radius: 0.5rem;
      background: ${themer("shade.darkest")};
    }
  }
`

const Director = styled(Default)`
  color: ${themer("shade.lightest")};
  padding-top: 2rem;
`

const PanelWrapper = styled(MainWrapper)`
  display: flex;
  flex-flow: row wrap;
`

const Showcase = styled(Skewed)`
  padding: 3rem 0 15rem;
  margin: 15rem 0;
  &:before {
    background: ${themer("shade.lightest")};
  }
`

const Home = ({ data }) => {
  const { allMarkdownRemark } = data
  const { nodes: showcaseItems } = allMarkdownRemark

  return (
    <Page accentKey="teal" bgDesign="space" seoProfile="home-page">
      <MainHero expanding>
        <p>Hi there, My name is</p>
        <h1>
          <span>Leander Rodrigues</span>
        </h1>
        <p>and I would describe myself as</p>
        <br />
        <h2>
          <Typer descriptors={homeData.descriptors} />
        </h2>
      </MainHero>
      <Introduction skew="4deg">
        <MainWrapper>
          <h2 className="title">"Who are you again?"</h2>
          <div
            className="self-description"
            dangerouslySetInnerHTML={{
              __html: marked(homeData["self-description"]),
            }}
          />
          <Button>
            <Link to="/about">More about me</Link>
          </Button>
        </MainWrapper>
      </Introduction>
      <Director>
        <h2 className="title">"So, what do you do again?"</h2>
        <h3 className="subtitle">
          Well I guess that depends,
          <br />
          what would you like to see?
        </h3>
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
            preText="Lemme see some"
            mainText="WORK STUFF"
            to="/resume"
          />
        </PanelWrapper>
      </Director>
      <Showcase skew="-4deg">
        <h2 className="title">"Help me, I can't decide!"</h2>
        <h3 className="subtitle">
          I've picked a few goodies out,
          <br />
          maybe you'll like one?
        </h3>
        <Carousel>
          {showcaseItems.map(
            ({ frontmatter: { slug, type, ...showItemProps } }) => {
              const showCaseLink = `/${type}/${slug}`
              return (
                <ShowItem
                  key={showCaseLink}
                  to={showCaseLink}
                  type={type}
                  includeType
                  {...showItemProps}
                />
              )
            }
          )}
        </Carousel>
      </Showcase>
    </Page>
  )
}

export const SHOWCASE_QUERY = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { showcase: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          type
          description
          image
          slug
        }
      }
    }
  }
`

export default Home
