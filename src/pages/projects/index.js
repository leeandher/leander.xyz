import React from "react"
import { graphql } from "gatsby"

import Page from "../../components/Page"
import Hero from "../../components/Hero"
import ProjectCard from "../../components/page-specific/Projects/ProjectCard"

const Projects = ({ data }) => {
  const { allMarkdownRemark } = data
  const { nodes } = allMarkdownRemark
  const projects = nodes.map(({ frontmatter, id, excerpt }) => ({
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
      <Hero height="50vh">
        <h1>Shenanigans</h1>
      </Hero>
      {projects.map(({ id, ...projectInfo }) => (
        <ProjectCard key={id} {...projectInfo} />
      ))}
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
          title
          repo
          link
          tech
        }
      }
    }
  }
`
