import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Page from "../../components/Page"
import Hero from "../../components/Hero"
import WhipStack from "../../components/WhipStack"
import { Skewed } from "../../components/PageSections"

const WhipSection = styled(Skewed)`
  padding: 10rem 0 3rem 0;
  margin: 10rem 0;
  height: 125vh;
  &:before {
    background: ${({ theme }) => theme.shade.lightest};
  }
  overflow: hidden;
  position: relative;
`

const Projects = ({ data }) => {
  const { allMarkdownRemark } = data
  const { nodes } = allMarkdownRemark
  const projects = nodes.reverse().map(({ frontmatter, id, excerpt }) => ({
    id,
    excerpt,
    ...frontmatter,
  }))
  return (
    <Page
      accent="orange"
      accentBg
      title="Wanna see something cool?"
      design="mesh"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <Hero height="35vh">
        <h1>Shenanigans</h1>
      </Hero>
      <WhipSection skew="4deg">
        <h2>My Project Stack</h2>
        <WhipStack itemProps={projects} />
      </WhipSection>
    </Page>
  )
}

export default Projects

export const projectsQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "projects" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        excerpt(pruneLength: 280)
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          slug
          screenshot
          title
          repo
          link
          tech
        }
      }
    }
  }
`
