import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import marked from "marked"

import Page from "../../components/Page"
import Hero from "../../components/Hero"
import MainWrapper from "../../components/MainWrapper"
import WhipStack from "../../components/WhipStack"
import Carousel from "../../components/Carousel"
import ShowItem from "../../components/ShowItem"
import { Default, Skewed } from "../../components/PageSections"

import { media, themer } from "../../styles/helpers"

import projectsData from "../../data/projects.json"

const StackSection = styled(Skewed)`
  padding: 10rem 0 3rem 0;
  margin: 10rem 0 0;
  height: 1350px;
  ${media.tablet`
    height: 1150px;
  `}
  ${media.phone`
    height: 1000px;
  `}
  &:before {
    background: ${themer("shade.lightest")};
    height: 88%;
  }
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
`

const QueueSection = styled(Default)`
  color: ${themer("shade.lightest")};
  padding-bottom: 10rem;
`

const OtherSection = styled(Skewed)`
  padding: 3rem 0 15rem;
  margin: 10rem 0;
  &:before {
    background: ${themer("shade.lightest")};
  }
`

const StylishShowItem = styled(ShowItem)`
  background: ${themer("shade.lighter")};
  box-shadow: 0 1.5rem 1.5rem ${themer("shade.darkest")} inset;
`

const Projects = ({ data }) => {
  const { allMarkdownRemark } = data
  const { nodes } = allMarkdownRemark
  const projectProps = nodes.map(({ frontmatter, id, excerpt }) => ({
    id,
    excerpt,
    ...frontmatter,
  }))
  return (
    <Page accentKey="orange" bgDesign="mesh" seoProfile="projects-page">
      <Hero height="50vh" expanding>
        <h1>Shenanigans</h1>
      </Hero>
      <StackSection skew="4deg">
        <h2 className="title">
          Projects<code>.Stack</code>
        </h2>
        <h3 className="subtitle">
          Get it, like{" "}
          <em>
            <code>stack</code>
          </em>
          , it's an S-tier pun <br />
          Swipe for the next, or click the buttons for more info
        </h3>
        <WhipStack itemProps={projectProps} />
      </StackSection>
      <QueueSection>
        <h2 className="title">
          Projects<code>.Queue</code>
        </h2>
        <h3 className="subtitle">
          Another coding pun! The same projects as above, <br />
          but far less flashy presentation 😎👌
        </h3>
        <Carousel>
          {projectProps
            .slice()
            .reverse()
            .map(({ slug, ...showItemProps }) => {
              const showCaseLink = `/projects/${slug}`
              return (
                <StylishShowItem
                  key={showCaseLink}
                  to={showCaseLink}
                  type="projects"
                  {...showItemProps}
                />
              )
            })}
        </Carousel>
      </QueueSection>
      <OtherSection skew="-4deg">
        <h2 className="title">Other Neat Stuff</h2>
        <MainWrapper>
          <div
            className="other-stuff"
            dangerouslySetInnerHTML={{
              __html: marked(projectsData["neat-stuff"] || ""),
            }}
          />
        </MainWrapper>
      </OtherSection>
    </Page>
  )
}

export default Projects

export const projectsQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "projects" } } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      nodes {
        id
        excerpt(pruneLength: 280)
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          slug
          image
          description
          title
          repo
          link
          tech
        }
      }
    }
  }
`
