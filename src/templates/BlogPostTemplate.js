import React from "react"
import { graphql } from "gatsby"

import Page from "../components/Page"
import Tag from "../components/Tag"
import InnerLink from "../components/page-specific/Media/InnerLink"

import {
  ContentWrapper,
  MediaContent,
  MediaHeader,
  MediaBanner,
  MediaPostContent,
  MediaPreContent,
  MediaSection,
  ScrollProgress,
} from "../components/page-specific/Media"

const BlogPostTemplate = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata
  const { frontmatter, html } = data.markdownRemark
  const { date, description, image, tags, title } = frontmatter

  return (
    <Page
      accentKey={title}
      bgDesign="bubbles"
      seoProfile="blog-page"
      seoImage={siteUrl + image}
      seoDescription={description}
      seoTitle={title}
    >
      <ScrollProgress />
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
          <MediaBanner src={image} alt={title} title={title} />
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
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug }, type: { eq: "blog" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        description
        image
        tags
        title
      }
    }
  }
`
