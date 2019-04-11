import React from "react"
import { graphql, Link } from "gatsby"
import slugify from "slugify"
import styled from "styled-components"

import Page from "../../components/Page"
import Hero from "../../components/Hero"
import { Skewed } from "../../components/PageSections"
import MainWrapper from "../../components/MainWrapper"

const CategoryTile = styled.div`
  display: flex;
  align-items: center;
  min-height: 100px;
  h3 {
    flex: 1;
  }
  p {
    flex: 4;
  }
`
const CategoryHeader = styled(Link)`
  display: inline-block;
  min-width: 250px;
  padding: 1.5rem 3rem;
  position: relative;
  margin: 2rem;
  transition: all 0.2s ease;
  transform:  skew(5deg) ;
  border: 5px solid ${({ theme }) => theme.accent};
  &:before {
    ${({ theme }) => theme.before}
    background: ${({ theme }) => theme.accent};
    opacity: 0.1;
    transition: all 0.2s ease;
  }
  h3 {
    margin: 0;
  }
  span {
    position: relative;
    font-weight: bold;
    &:before {
      ${({ theme }) => theme.before}
      background: ${({ theme }) => theme.accent};
      width: 110%;
      height: 35%;
      top: 60%;
      transform: translateX(-5%);
    }
  }
  &:hover {
    &:before {
      opacity: 0.3;
    }
    transform:  skew(-5deg) ;
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
      <Hero expanding height="50vh">
        <h1>
          <code>&lt;Scribblings /&gt;</code>
        </h1>
      </Hero>
      <NoteBlock skew="-4deg">
        <MainWrapper>
          {categorySlugs.map((categorySlug, i) => (
            <CategoryTile>
              <CategoryHeader to={categorySlug}>
                <h3>
                  <span>{categories[i]}</span>
                </h3>
              </CategoryHeader>
              <p>
                This is a description about the thing that this is about or like
                whatever ya know
              </p>
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
