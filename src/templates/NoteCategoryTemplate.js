import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Page from "../components/Page"
import Tag from "../components/Tag"
import Button from "../components/Button"

import {
  ContentWrapper,
  MediaContent,
  MediaHeader,
  MediaSection,
} from "../components/page-specific/Media"

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
      <MediaHeader>
        <Button>
          <Link to="/notes">&lt;-- /notes</Link>
        </Button>
      </MediaHeader>
      <MediaSection>
        <ContentWrapper>
          <MediaContent dangerouslySetInnerHTML={{ __html: html }} />
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
