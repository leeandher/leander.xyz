import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"

import { palette } from "./styles"

import Nav from "./Nav.js"

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
    color: inherit;
    text-decoration: none;
  }
`

const StyledPage = styled.div``

class Page extends React.Component {
  state = {
    showSideBar: false,
  }

  toggleNav = () => {
    this.setState({ showSideBar: !this.state.showSideBar })
  }

  render() {
    const { accent, children } = this.props
    const theme = {
      accent: palette.color[accent],
      ...palette,
    }
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <StyledPage>
            <Nav
              showSideBar={this.state.showSideBar}
              handleToggle={this.toggleNav}
            />
            {children}
          </StyledPage>
        </ThemeProvider>
      </>
    )
  }
}

export default Page
