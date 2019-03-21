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

const About = () => {
  return (
    <Page
      accent="red"
      accentBg
      title="me, me, mE, ME, ME!"
      design="bubbles"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <Header>
        <h1>
          <code>
            //TODO: <span>Make about page</span>
          </code>
        </h1>
      </Header>
    </Page>
  )
}

export default About
