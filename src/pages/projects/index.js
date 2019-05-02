import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Page from "../../components/Page"
import Hero from "../../components/Hero"
import WhipStack from "../../components/WhipStack"
import MainWrapper from "../../components/MainWrapper"
import { Default, Skewed } from "../../components/PageSections"

import { media, themer } from "../../styles/helpers"

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
    background: ${({ theme }) => theme.shade.lightest};
    height: 88%;
  }
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
`

const QueueSection = styled(Default)`
  color: ${themer("shade.lightest")};
  padding-bottom: 5rem;
`

const DoneSection = styled(Skewed)`
  padding: 3rem 0 15rem;
  margin: 10rem 0;
  &:before {
    background: ${themer("shade.lightest")};
  }
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
    <Page accent="orange" bgDesign="mesh" seoProfile="projects-page">
      <Hero height="35vh">
        <h1>Shenanigans</h1>
      </Hero>
      <StackSection skew="4deg">
        <h2 className="title">
          Projects<code>.Stack</code>
        </h2>
        <WhipStack itemProps={projectProps} />
      </StackSection>
      <QueueSection>
        <h2 className="title">
          Projects<code>.Queue</code>
        </h2>
        <MainWrapper>
          <div>dasdf</div>
        </MainWrapper>
      </QueueSection>
      <DoneSection skew="-4deg">
        <h2 className="title">Other Neat Stuff</h2>
      </DoneSection>
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
          title
          repo
          link
          tech
        }
      }
    }
  }
`
