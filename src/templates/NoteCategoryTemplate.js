import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Page from "../components/Page"
import Tag from "../components/Tag"

import {
  ContentWrapper,
  MediaContent,
  MediaHeader,
  MediaPostContent,
  MediaPreContent,
  MediaSection,
} from "../components/page-specific/Media"

const P = styled.p`
  color: white;
  font-size: 3rem;
`

const NoteCategoryTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { html } = markdownRemark
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
          <MediaContent
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ContentWrapper>
      </MediaSection>
    </Page>
  )
}

export default NoteCategoryTemplate

export const noteQuery = graphql`
  query($absolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $absolutePath }) {
      html
    }
  }
`
