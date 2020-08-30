import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Page from "../components/Page"
import Button from "../components/Button"

import { themer } from "../styles/helpers"

const Header = styled.div`
  height: 100vh;
  text-align: center;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${themer("spacing.default")};
  color: ${themer("accent")};
  margin-top: -${themer("constants.navBarHeight")};
  span {
    color: ${themer("shade.lighter")};
  }
`

const StylishHome = styled(Button)`
  display: block;
  color: ${themer("shade.lightest")};
  font-size: 1.6rem;
  font-weight: normal;
`

const FourOhFour = () => {
  return (
    <Page accentKey="teal" bgDesign="mesh" seoProfile="404-page">
      <Header>
        <h1>
          <code>
            {/* eslint-disable */}
            // TODO: <span>Make better 404 page</span>
            {/* eslint-enable */}
          </code>
        </h1>
        <Link to="/">
          <StylishHome>Take me home</StylishHome>
        </Link>
      </Header>
    </Page>
  )
}

export default FourOhFour
