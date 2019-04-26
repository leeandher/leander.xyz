import React from "react"
import { graphql, Link } from "gatsby"
import slugify from "slugify"
import styled from "styled-components"

import Page from "../components/Page"
import InnerLink from "../components/page-specific/Media/InnerLink"

import {
  ContentWrapper,
  MediaContent,
  MediaHeader,
  MediaSection,
  MediaPostContent,
} from "../components/page-specific/Media"

const PageLink = styled(Link)`
  padding: 2rem;
  display: block;
  text-align: left;
  font-style: italic;
  font-weight: 600;
  margin: 1rem 2rem;
  position: relative;
  overflow: hidden;
  ${({ theme }) => theme.transition.default("letter-spacing")};
  &:before {
    ${({ theme }) => theme.before}
    background: ${({ theme }) => theme.accent};
    top: 50%;
    transform: skew(-45deg) translate(90%);
  }
  &:after {
    ${({ theme }) => theme.before}
    background: ${({ theme }) => theme.accent};
    height: 10%;
    top: 90%;
  }
  &:hover, &:focus, &:active {
    letter-spacing: 2px;
  }
`

const NoteCategoryTemplate = ({ data, location }) => {
  const { markdownRemark, allFile } = data
  const { html } = markdownRemark
  const { distinct: noteTitles } = allFile
  const noteTitleSlugs = noteTitles.map(
    noteTitle => `${location.pathname}/${slugify(noteTitle, { lower: true })}`
  )
  return (
    <Page accent="random" bgDesign="bubbles" seoProfile="notes-page">
      <MediaHeader>
        <InnerLink to="/notes">&lt;-- /notes</InnerLink>
      </MediaHeader>
      <MediaSection>
        <ContentWrapper>
          <MediaContent dangerouslySetInnerHTML={{ __html: html }} />
          <MediaPostContent>
            <hr />
            <div>
              {noteTitles.map((noteTitle, i) => (
                <PageLink key={noteTitle} to={noteTitleSlugs[i]}>
                  {noteTitle}
                </PageLink>
              ))}
            </div>
          </MediaPostContent>
        </ContentWrapper>
      </MediaSection>
    </Page>
  )
}

export default NoteCategoryTemplate

export const noteQuery = graphql`
  query($absolutePath: String!, $relativeDirectory: String!) {
    markdownRemark(fileAbsolutePath: { eq: $absolutePath }) {
      html
    }
    allFile(
      filter: {
        relativeDirectory: { eq: $relativeDirectory }
        name: { ne: "README" }
      }
    ) {
      distinct(field: name)
    }
  }
`
