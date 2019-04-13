import React from "react"
import { Helmet } from "react-helmet"
import { withPrefix } from "gatsby"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"

import { palette } from "../styles"

import Nav from "./Nav"
import Footer from "./Footer"
import ParticleBackground from "./ParticleBackground"

import { consoleLiteral } from "../data/consoleLiteral"
import { genRandProperty } from "../helpers"

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  @font-face {
    font-family: dm;
    src: url(${withPrefix("fonts/dm.ttf")});
  }
  
  body {
    padding: 0;
    margin: 0;
    font-size: 1.75rem;
    line-height: 1.5;
    font-family: ${palette.font.family};
  }
  code {
    font-family: ${palette.font.mono} !important;
  }
  h1 {
    font-size: 6rem
  }
  h2  {
    font-size: 3.5rem;
  }
  h3, 
  h4, 
  h5 {
    font-size: 2.5rem;
  }
  a {
    font-size: 1.75rem;
    color: inherit;
    text-decoration: none;
  }
  Link, button {
    user-select: none;
  }
  #nprogress {
    pointer-events: none;
    .bar {
      background: #fefefe;
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
    }
    .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px #fefefe, 0 0 5px #fefefe;
      opacity: 1.0;
      transform: rotate(3deg) translate(0px, -4px);
    }
  }
  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
    #nprogress .bar {
      position: absolute;
    }
  }
`

const StyledPage = styled.div`
  * {
    mark,
    ::selection {
      background: ${({ theme }) => theme.accent};
      background: ${({ theme }) => theme.accent}80;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 10px ${({ theme }) => theme.accent};
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

  componentDidMount() {
    // console.clear()
    // console.log(consoleLiteral)
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
      accent:
        accent === "random"
          ? genRandProperty(palette.color, true)
          : palette.color[accent],
      ...palette,
    }
    return (
      <>
        <GlobalStyle />
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link
            rel="mask-icon"
            href={withPrefix("icons/safari-pinned-tab.svg")}
            color={theme.accent}
          />
          <meta name="msapplication-TileColor" content={theme.accent} />
          <meta name="theme-color" content={theme.shade.darker} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={withPrefix("icons/apple-touch-icon.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={withPrefix("/favicon-32x32.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={withPrefix("/favicon-16x16.png")}
          />
          <link rel="manifest" href={withPrefix("site.webmanifest")} />
        </Helmet>
        <ThemeProvider theme={theme}>
          <StyledPage>
            <ParticleBackground
              height="100vh"
              design={design}
              accent={accentBg ? theme.accent : theme.shade.lighter}
            />
            <Nav
              showSideBar={this.state.showSideBar}
              handleToggle={this.toggleNav}
              accent={theme.accent}
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
