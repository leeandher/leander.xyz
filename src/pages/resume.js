import React from "react"
import styled from "styled-components"

import Page from "../components/Page"

import seoDescriptions from "../data/seo-descriptions.json"

const Header = styled.div`
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.default};
  color: ${({ theme }) => theme.accent};
  span {
    color: ${({ theme }) => theme.shade.lighter};
  }
`

const Resume = () => {
  return (
    <Page
      accent="blue"
      accentBg
      title="Resume - Leander Rodrigues"
      design="bubbles"
      description={seoDescriptions.resume}
    >
      <Header>
        <h1>
          <code>
            //TODO: <span>Make resume page</span>
          </code>
        </h1>
      </Header>
    </Page>
  )
}

export default Resume
