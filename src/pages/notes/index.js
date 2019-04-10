import React from "react"
import { graphql, Link } from "gatsby"
import slugify from "slugify"
import styled from "styled-components"

import Page from "../../components/Page"

const CategoryTile = styled(Link)`
  display: block;
  border: 10px solid red;
  background: white;
  color: blue;
`

const Notes = ({ data }) => {
  const { allFile } = data
  const { distinct: categories } = allFile
  const categorySlugs = categories.map(
    category => `notes/${slugify(category, { lower: true })}`
  )

  return (
    <Page
      accent="green"
      accentBg
      title="Learning can be fun!"
      design="mesh"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      {categorySlugs.map((categorySlug, i) => (
        <CategoryTile to={categorySlug}>{categories[i]}</CategoryTile>
      ))}
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
