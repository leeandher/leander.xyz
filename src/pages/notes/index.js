import React from "react"
import { graphql } from "gatsby"
import slugify from "slugify"
import styled from "styled-components"

import Page from "../../components/Page"
import Hero from "../../components/Hero"
import { Skewed } from "../../components/PageSections"
import MainWrapper from "../../components/MainWrapper"
import CategoryLink from "../../components/page-specific/Media/CategoryLink"

import noteDescriptions from "../../data/note-descriptions.json"

const CategoryTile = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  min-height: 100px;
  h3 {
    flex: 1;
  }
  p {
    flex: 4;
    min-width: 320px;
  }
`

const NoteBlock = styled(Skewed)`
  padding: 3rem 0 15rem 0;
  margin: 10rem 0;
  &:before {
    background: ${({ theme }) => theme.shade.lightest};
  }
`

const Notes = ({ data }) => {
  const { allFile } = data
  const { distinct: categories } = allFile
  const categorySlugs = categories.map(
    category => `/notes/${slugify(category, { lower: true })}`
  )
  return (
    <Page accent="green" design="mesh" seoProfile="notes-section">
      <Hero expanding height="50vh">
        <h1>
          <code>&lt;Scribblings /&gt;</code>
        </h1>
      </Hero>
      <NoteBlock skew="-4deg">
        <h2>
          My <code>Library</code>
        </h2>
        <h3>
          These are notes taken during talks and random research stints, <br />
          but largely while taking some helpful online courses
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
