import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Page from "../components/Page"
import Tag from "../components/Tag"
import MainWrapper from "../components/MainWrapper"

const MediaHeader = styled.header`
  padding: 10rem;
`

const MediaSection = styled.article`
  position: relative;
  padding: 0;
  transform: skewY(5deg);
  overflow: hidden;
  border: 0.5rem solid ${({ theme }) => theme.accent};
  border-width: 0.5rem 0;
  &:before {
    ${({ theme }) => theme.before}
    background: ${({ theme }) => theme.shade.dark};
    opacity: 0.75;
  }
`

const ContentWrapper = styled(MainWrapper)`
  background: ${({ theme }) => theme.shade.lightest};
  transform: skewY(-5deg);
  margin: 0 auto;
  z-index: 100;
  position: relative;
  padding: 5rem 2rem;
  hr {
    border: 1px solid ${({ theme }) => theme.accent};
  }
  &:before,
  &:after {
    ${({ theme }) => theme.before}
    background: ${({ theme }) => theme.shade.lightest};
    transform: translateY(-100%);
  }
  &:after {
    transform: translateY(100%);
  }
`

const MediaPreContent = styled.div`
  margin: 0 auto;
  color: ${({ theme }) => theme.shade.dark};
  padding: 1rem;
  h1 {
    font-size: 3rem;
    margin: 1.5rem 0;
    transform: skew(-6deg);
    span {
      background: ${({ theme }) => theme.accent};
      padding: 1rem 2rem;
      color: ${({ theme }) => theme.shade.darkest};
    }
  }
  p {
    font-weight: 300;
  }
  time {
    font-size: 2rem;
    font-style: italic;
  }
`

const MediaContent = styled.main`
  margin: 0 auto;
  padding: 1rem 4rem;
  p {
    margin: 2.5rem 0;
  }
  figure {
  }

  img {
    box-sizing: content-box;
    padding: 1rem;
    border: 2px solid ${({ theme }) => theme.accent};
    max-width: 100%;
    display: block;
    margin: 1rem auto;
  }
  figcaption {
    text-align: center;
    font-style: italic;
    color: ${({ theme }) => theme.shade.mid};
  }
`
const MediaPostContent = styled.div`
  text-align: right;
  margin: 2rem auto;
  padding: 1rem;
`

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
      <MediaHeader />
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
          <MediaContent
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
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
