import React from "react"
import { graphql } from "gatsby"
import slugify from "slugify"

import Page from "../components/Page"
import Button from "../components/Button"
import InnerLink from "../components/page-specific/Media/InnerLink"

import {
  ContentWrapper,
  MediaContent,
  MediaHeader,
  MediaSection,
  ScrollProgress,
  MediaPostContent,
} from "../components/page-specific/Media"

const NoteTemplate = ({ data, pageContext }) => {
  const { markdownRemark, site } = data
  const { html } = markdownRemark
  const { absolutePath, relativeDirectory: parentCategory } = pageContext
  const parentCategorySlug = slugify(`${parentCategory}`, {
    lower: true,
  })
  const editLinkLocation = `${
    site.siteMetadata.repository
  }/blob/live/${absolutePath.slice(absolutePath.indexOf("src/pages/notes"))}`
  return (
    <Page
      accentKey={parentCategorySlug}
      bgDesign="bubbles"
      seoProfile="notes-page"
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
          <MediaPostContent>
            <a href={editLinkLocation} target="_blank" rel="noreferrer">
              <Button>📝 Edit this page</Button>
            </a>
          </MediaPostContent>
        </ContentWrapper>
      </MediaSection>
    </Page>
  )
}

export default NoteTemplate

export const noteQuery = graphql`
  query($absolutePath: String!) {
    site {
      siteMetadata {
        repository
      }
    }
    markdownRemark(fileAbsolutePath: { eq: $absolutePath }) {
      html
    }
  }
`
