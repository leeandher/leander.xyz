import React from "react"
import { graphql, Link } from "gatsby"
import slugify from "slugify"

import Page from "../components/Page"
import InnerLink from "../components/page-specific/Media/InnerLink"

import {
  ContentWrapper,
  MediaContent,
  MediaHeader,
  MediaSection,
  ScrollProgress,
} from "../components/page-specific/Media"

const NoteTemplate = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { html } = markdownRemark
  const { relativeDirectory: parentCategory } = pageContext
  const parentCategorySlug = slugify(`${parentCategory}`, {
    lower: true,
  })

  return (
    <Page
      accent="random"
      accentBg
      title="Writing is hard"
      design="bubbles"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <ScrollProgress />
      <MediaHeader>
        <InnerLink to="/notes">&lt;-- /notes</InnerLink>
        <InnerLink to={`/notes/${parentCategorySlug}`}>
          &lt;-- /notes/{parentCategorySlug}
        </InnerLink>
      </MediaHeader>
      <MediaSection>
        <ContentWrapper>
          <MediaContent dangerouslySetInnerHTML={{ __html: html }} />
        </ContentWrapper>
      </MediaSection>
    </Page>
  )
}

export default NoteTemplate

export const noteQuery = graphql`
  query($absolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $absolutePath }) {
      html
    }
  }
`
