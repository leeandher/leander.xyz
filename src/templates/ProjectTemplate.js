import React from "react"
import { graphql, Link } from "gatsby"
import { FaCode, FaLink } from "react-icons/fa"
import styled from "styled-components"

import Page from "../components/Page"
import Tag from "../components/Tag"
import Button from "../components/Button"
import AnchorLink from "../components/AnchorLink"

import {
  ContentWrapper,
  MediaBanner,
  MediaContent,
  MediaHeader,
  MediaPostContent,
  MediaPreContent,
  MediaSection,
} from "../components/page-specific/Media"

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const ProjectTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { date, title, repo, link, tech, image } = frontmatter
  return (
    <Page
      accentKey={title}
      bgDesign="bubbles"
      seoProfile="projects-page"
      seoTitle={title}
    >
      <MediaHeader>
        <Button>
          <Link to="/projects" tabIndex="-1">
            &lt;-- /projects
          </Link>
        </Button>
      </MediaHeader>
      <MediaSection>
        <ContentWrapper>
          <MediaPreContent>
            <ProjectHeader>
              <h1>
                <span>{title}</span>
              </h1>
              <div>
                <AnchorLink
                  href={repo}
                  title="Take a peek at the code! (Repository link)"
                >
                  <FaCode />
                </AnchorLink>
                <AnchorLink
                  href={link}
                  title="View the live project! (Live link)"
                >
                  <FaLink />
                </AnchorLink>
              </div>
            </ProjectHeader>
            <time>Completed: {date}</time>
          </MediaPreContent>
          <MediaBanner src={image} alt={title} title={title} />
          <MediaContent dangerouslySetInnerHTML={{ __html: html }} />
          <MediaPostContent>
            {tech.map(techName => (
              <Tag tag={techName} key={Math.random()} />
            ))}
          </MediaPostContent>
        </ContentWrapper>
      </MediaSection>
    </Page>
  )
}

export default ProjectTemplate

export const projectQuery = graphql`
  query($slug: String!) {
    markdownRemark(
      frontmatter: { slug: { eq: $slug }, type: { eq: "projects" } }
    ) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        repo
        image
        link
        tech
      }
    }
  }
`
