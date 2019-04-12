import React from "react"
import { graphql } from "gatsby"

import Page from "../components/Page"
import Tag from "../components/Tag"
import InnerLink from "../components/page-specific/Media/InnerLink"

import {
  ContentWrapper,
  MediaContent,
  MediaHeader,
  MediaPostContent,
  MediaPreContent,
  MediaSection,
} from "../components/page-specific/Media"

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { date, description, tags, title } = frontmatter
  return (
    <Page
      accent="random"
      accentBg
      title="Writing is hard"
      design="bubbles"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <MediaHeader>
        <InnerLink to="/blog">&lt;-- /blog</InnerLink>
      </MediaHeader>
      <MediaSection>
        <ContentWrapper>
          <MediaPreContent>
            <h1>
              <span>{title}</span>
            </h1>
            <p>{description}</p>
            <time>{date}</time>
          </MediaPreContent>
          <hr />
          <MediaContent dangerouslySetInnerHTML={{ __html: html }} />
          <MediaPostContent>
            {tags.map(tag => (
              <Tag tag={tag} key={Math.random()} />
            ))}
          </MediaPostContent>
        </ContentWrapper>
      </MediaSection>
    </Page>
  )
}

export default BlogPostTemplate

export const blogPostQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug }, type: { eq: "blog" } }) {
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
