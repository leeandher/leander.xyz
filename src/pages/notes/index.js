import React from "react"
import { graphql } from "gatsby"
import slugify from "slugify"
import styled from "styled-components"

import Page from "../../components/Page"
import Hero from "../../components/Hero"
import { Skewed } from "../../components/PageSections"
import MainWrapper from "../../components/MainWrapper"
import CategoryLink from "../../components/page-specific/Media/CategoryLink"

import { media, themer } from "../../styles/helpers"

import noteDescriptions from "../../data/note-descriptions.json"

const CategoryTile = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  ${media.phone`
    grid-template-columns: auto;
  `}
  align-items: center;
  min-height: 100px;
  padding: 2rem 0;
  border-bottom: 2px solid ${themer("accent")};
  &:nth-last-child(1) {
    border: 0;
  }
`

const NoteBlock = styled(Skewed)`
  padding: 3rem 0 10rem 0;
  margin: 10rem 0;
  &:before {
    background: ${themer("shade.lightest")};
  }
  .subtitle {
    max-width: 700px;
    margin: 0 auto;
  }
`

const Notes = ({ data }) => {
  const { allFile } = data
  const { distinct: categories } = allFile
  const categorySlugs = categories.map(
    category => `/notes/${slugify(category, { lower: true })}`
  )
  return (
    <Page accentKey="green" bgDesign="mesh" seoProfile="notes-page">
      <Hero expanding height="50vh">
        <h1>
          <code>&lt;Scribblings/&gt;</code>
        </h1>
      </Hero>
      <NoteBlock skew="-4deg">
        <h2 className="title">
          My <code>Library</code>
        </h2>
        <h3 className="subtitle">
          These are notes taken during some talks, random research stints, and
          while taking some neat online courses.
        </h3>
        <MainWrapper>
          {categorySlugs.map((categorySlug, i) => (
            <CategoryTile key={i}>
              <CategoryLink to={categorySlug}>
                <h3>
                  <span>{categories[i]}</span>
                </h3>
              </CategoryLink>
              <p>{noteDescriptions[categories[i]]}</p>
            </CategoryTile>
          ))}
        </MainWrapper>
      </NoteBlock>
    </Page>
  )
}

export default Notes

export const notesQuery = graphql`
  {
    allFile(filter: { sourceInstanceName: { eq: "notes" } }) {
      distinct(field: relativeDirectory)
    }
  }
`
