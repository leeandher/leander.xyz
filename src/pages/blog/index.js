import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Page from "../../components/Page"
import Hero from "../../components/Hero"
import MediaLink from "../../components/MediaLink"
import MainWrapper from "../../components/MainWrapper"

const YearWrapper = styled.section`
  h2.year {
    display: block;
    transform: skew(-7deg);
    line-height: 0;
    margin: 8rem 2rem;
    padding-left: 15%;
    border-bottom: 3px solid ${({ theme }) => theme.shade.lightest};
    span {
      background: ${({ theme }) => theme.accent};
      padding: 1rem 4rem;
      display: inline;
    }
  }
  div.wrap-posts {
    display: flex;
    flex-flow: row wrap;
    justify-content: left;
  }
`

const Blog = ({ data }) => {
  const { allMarkdownRemark } = data
  const { nodes: blogPosts } = allMarkdownRemark
  const blogPostsByYear = {}
  blogPosts.forEach(post => {
    const blogYear = new Date(post.frontmatter.date).getFullYear()
    blogPostsByYear[blogYear] = blogPostsByYear[blogYear]
      ? [...blogPostsByYear[blogYear], post]
      : [post]
  })
  const sortedPosts = Object.entries(blogPostsByYear).sort(
    ([yearStringA], [yearStringB]) => {
      return parseInt(yearStringB) - parseInt(yearStringA)
    }
  )

  return (
    <Page
      accent="yellow"
      accentBg
      title="Writing is hard"
      design="bubbles"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <Hero expanding height="50vh">
        <h1>
          MyBlog<code>.md</code>
        </h1>
      </Hero>
      <MainWrapper maxWidth="95vw">
        <main>
          {sortedPosts.map(([year, blogPostArray]) => (
            <YearWrapper>
              <h2 className="year">
                <span>{year}</span>
              </h2>
              <div className="wrap-posts">
                {blogPostArray.map(
                  ({ frontmatter: blogPostsProps, timeToRead }) => (
                    <MediaLink
                      timeToRead={timeToRead}
                      key={blogPostsProps.slug}
                      {...blogPostsProps}
                    />
                  )
                )}
              </div>
            </YearWrapper>
          ))}
        </main>
      </MainWrapper>
    </Page>
  )
}

export default Blog

export const blogPostsQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blog" }, archive: { eq: false } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
          description
          tags
        }
      }
    }
  }
`
