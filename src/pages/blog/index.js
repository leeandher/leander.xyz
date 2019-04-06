import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Page from "../../components/Page"
import Hero from "../../components/Hero"
import MediaLink from "../../components/MediaLink"
import MainWrapper from "../../components/MainWrapper"

const PostSection = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

const Blog = ({ data }) => {
  const { allMarkdownRemark } = data
  const { nodes: blogPosts } = allMarkdownRemark
  return (
    <Page
      accent="yellow"
      accentBg
      title="Writing is hard"
      design="bubbles"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <Hero height="50vh">
        <h1>Blog</h1>
      </Hero>
      <MainWrapper maxWidth="95vw">
        <PostSection>
          {blogPosts.map(({ frontmatter: blogPostsProps }) => (
            <MediaLink {...blogPostsProps} key={blogPostsProps.path} />
          ))}
        </PostSection>
      </MainWrapper>
    </Page>
  )
}

export default Blog

export const blogPostsQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          path
          title
          preview
          tags
        }
      }
    }
  }
`
