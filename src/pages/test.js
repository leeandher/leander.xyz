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
  const makeNPlusOneApiCalls = async () => {
    for (let i = 0; i < 20; i++) {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      const data = await response.json()
      console.log(data)
    }
  }

  makeNPlusOneApiCalls()

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
        <button onClick={() => makeNPlusOneApiCalls()}>
          Make N+1 API Calls
        </button>
        <button onClick={() => undefinedFunction()}>
          Call Undefined Function
        </button>
      </Header>
    </Page>
  )
}

export default FourOhFour
