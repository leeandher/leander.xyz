import React from "react"
import styled from "styled-components"

import Page from "../components/Page"

import { themer } from "../styles/helpers"

const Header = styled.div`
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${themer("spacing.default")};
  color: ${themer("accent")};
  span {
    color: ${themer("shade.lighter")};
  }
`

const Projects = () => {
  return (
    <Page accent="pink" bgDesign="mesh" seoProfile="404-page">
      <Header>
        <h1>
          <code>
            {/* eslint-disable-line react/jsx-no-comment-textnodes */}
            // TODO: <span>Make better 404 page</span>
          </code>
        </h1>
      </Header>
    </Page>
  )
}

export default Projects
