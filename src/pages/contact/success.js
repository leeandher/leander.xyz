import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Page from "../../components/Page"
import Button from "../../components/Button"

import { themer } from "../../styles/helpers"

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
  font-weight: bold;
`

const Success = () => {
  return (
    <Page accentKey="purple" bgDesign="mesh" seoProfile="404-page">
      <Header>
        <h1>
          <span>I'll get back to you</span>
          <br />
          ASAP<span>.</span>
          <br />
          <span>Probably.</span>
        </h1>
        <Link to="/">
          <StylishHome>Take me home</StylishHome>
        </Link>
      </Header>
    </Page>
  )
}

export default Success
