import React from "react"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"

import { palette } from "./styles"

import Nav from "./Nav.js"
import Footer from "./Footer.js"
import ParticleBackground from "./ParticleBackground"

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  ::selection {
    background: ${({ theme }) => ""}red;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.5;
    font-family: ${palette.font.family};
  }
  h1 {
    font-size: 5rem
  }
  h2  {
    font-size: 3rem;
  }
  h3 {
    font-size: 2rem;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`

const StyledPage = styled.div`
  * {
    ::selection {
      background: ${({ theme }) => theme.accent};
      border: 2px solid blue;
      opacity: 0.5;
    }
  }
`

class Page extends React.Component {
  state = {
    showSideBar: false,
  }

  toggleNav = () => {
    this.setState({ showSideBar: !this.state.showSideBar })
  }

  render() {
    const {
      accent,
      accentBg,
      children,
      description,
      design,
      title,
    } = this.props
    const theme = {
      accent: palette.color[accent],
      ...palette,
    }
    return (
      <>
        <GlobalStyle />
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        <ThemeProvider theme={theme}>
          <StyledPage>
            {Boolean(design) ? (
              <ParticleBackground
                height="100vh"
                design={design}
                accent={accentBg ? theme.accent : theme.shade.lighter}
              />
            ) : null}
            <Nav
              showSideBar={this.state.showSideBar}
              handleToggle={this.toggleNav}
            />
            {children}
            <Footer />
          </StyledPage>
        </ThemeProvider>
      </>
    )
  }
}

export default Page
