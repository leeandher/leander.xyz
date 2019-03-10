import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"

import { palette } from "./styles"

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.5;
    font-family: ${palette.font.family};
  }
  a {
    text-decoration: none;
  }
`

const StyledPage = styled.div``

const Page = ({ accent, children }) => {
  const theme = {
    accent: palette.color[accent],
    ...palette,
  }
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <StyledPage>{children}</StyledPage>
      </ThemeProvider>
    </>
  )
}

export default Page
