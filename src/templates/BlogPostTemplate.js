import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Page from "../components/Page"
import Tag from "../components/Tag"

const MediaHeader = styled.header``

const MediaSection = styled.section``

const MediaPost = styled.article`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  background: ${({ theme }) => theme.shade.lightest};
  padding: 5rem;
`

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { date, description, tags, title } = frontmatter
  return (
    <Page
      accent="yellow"
      accentBg
      title="Writing is hard"
      design="bubbles"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <h1>{title}</h1>
      <article style={{ color: "red" }}>{description}</article>
      <h2>{date}</h2>
      {tags.map(tag => (
        <Tag tag={tag} key={Math.random()} />
      ))}
      <MediaPost
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Page>
  )
}

export default BlogPostTemplate

export const blogPostQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
