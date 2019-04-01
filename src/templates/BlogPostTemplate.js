import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Page from "../components/Page"

const Header = styled.div`
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.default};
  color: ${({ theme }) => theme.accent};
  span {
    color: ${({ theme }) => theme.shade.lighter};
  }
`

const Article = styled.article`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.spacing.mw};
  background: ${({ theme }) => theme.shade.lightest};
  padding: 5rem;
`

const BlogTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { date, preview, tags, title } = frontmatter
  return (
    <Page
      accent="yellow"
      accentBg
      title="Writing is hard"
      design="bubbles"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <Article>
        <div>
          <h1>{title}</h1>
          <article style={{ color: "red" }}>{preview}</article>
          <h2>{date}</h2>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </Article>
    </Page>
  )
}

export default BlogTemplate

export const blogPostQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        preview
        tags
      }
    }
  }
`