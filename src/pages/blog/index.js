import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Page from "../../components/Page"
import Hero from "../../components/Hero"
import MainWrapper from "../../components/MainWrapper"

import MediaLink from "../../components/page-specific/Media/MediaLink"

import { themer } from "../../styles/helpers"

const YearWrapper = styled.section`
  h2.year {
    display: block;
    transform: skew(-7deg);
    line-height: 0;
    margin: 8rem 2rem;
    padding-left: 15%;
    border-bottom: 3px solid ${themer("shade.lightest")};
    span {
      background: ${themer("accent")};
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
    <Page accentKey="yellow" bgDesign="bubbles" seoProfile="blog-page">
      <Hero expanding height="50vh">
        <h1>
          MyBlog<code>.md</code>
        </h1>
      </Hero>
      <MainWrapper maxWidth="95vw">
        <main>
          {sortedPosts.map(([year, blogPostArray]) => (
            <YearWrapper key={year}>
              <h2 className="year">
                <span>{year}</span>
              </h2>
              <div className="wrap-posts">
                {blogPostArray.map(
                  ({ frontmatter: blogPostsProps, timeToRead }) => (
                    <MediaLink
                      timeToRead={timeToRead}
                      key={blogPostsProps.slug}
                      image={blogPostsProps.image}
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
          description
          image
          slug
          title
          type
          tags
        }
      }
    }
  }
`
