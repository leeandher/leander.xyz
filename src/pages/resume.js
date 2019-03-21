import React from "react"
import styled from "styled-components"

import Page from "../components/Page"

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
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
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
