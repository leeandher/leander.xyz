import React from "react"
import { graphql, Link } from "gatsby"
import slugify from "slugify"
import styled from "styled-components"

import Page from "../components/Page"
import AnchorLink from "../components/AnchorLink"
import InnerLink from "../components/page-specific/Media/InnerLink"

import {
  ContentWrapper,
  MediaContent,
  MediaHeader,
  MediaSection,
  MediaPostContent,
} from "../components/page-specific/Media"

import { themer } from "../styles/helpers"

const PageLink = styled(Link)`
  padding: 2rem;
  display: block;
  text-align: left;
  font-style: italic;
  font-weight: 600;
  margin: 1rem 2rem;
  position: relative;
  overflow: hidden;
  ${({ theme }) => theme.transition.default("all")};
  &:before {
    ${themer("before")}
    ${({ theme }) => theme.transition.default("all")};
    background: ${themer("accent")};
    top: 50%;
    transform: skew(-45deg) translate(90%);
  }
  &:after {
    ${themer("before")}
    background: ${themer("accent")};
    height: 10%;
    top: 90%;
  }
  &:hover, &:focus, &:active {
    letter-spacing: 2px;
    &:before {
      
    top: 0%;
    transform: skew(-45deg) translate(90%);
    }
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
    <Page accentKey="green" bgDesign="bubbles" seoProfile="notes-page">
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
            <p className="disclaimer">
              I wrote these notes while learning so they might be inaccurate or
              outdated. If so, let me know, and I'll try to fix them up ASAP.
              Feel free to make an issue or PR in the{" "}
              <AnchorLink href="https://github.com/leeandher/leander.xyz">
                site repository
              </AnchorLink>{" "}
              to help me out!
            </p>
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
