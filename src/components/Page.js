import React from "react"
import styled, { css, ThemeProvider } from "styled-components"
import Konami from "react-konami"

import GlobalStyles from "../styles/GlobalStyles"
import { palette } from "../styles/palette"

import Nav from "./Nav"
import Footer from "./Footer"
import SEOBundle from "./SEOBundle"
import ParticleBackground from "./ParticleBackground"

import { genRandProperty } from "../helpers"
import { themer } from "../styles/helpers"

const StyledPage = styled.div`
  margin-top: ${themer("constants.navBarHeight")};
  ${({ egged }) => {
    if (!egged) return
    return css`
      @keyframes colorize {
        0% {
          filter: hue-rotate(0deg);
        }
        100% {
          filter: hue-rotate(360deg);
        }
      }
      animation: colorize infinite forwards 2s linear;
    `
  }}
`

class Page extends React.Component {
  state = {
    egged: false,
    showSideBar: false,
  }

  toggleNav = () => {
    const { showSideBar } = this.state
    this.setState({ showSideBar: !showSideBar })
  }

  onKonami = () => {
    this.setState({ egged: true })
    alert("Do you taste the rainbow?")
  }

  render() {
    const { accent, bgColor, children, bgDesign, seoProfile } = this.props
    const { egged, showSideBar } = this.state
    const theme = {
      accent:
        accent === "random"
          ? genRandProperty(palette.color, true)
          : palette.color[accent],
      ...palette,
    }
    return (
      <>
        <SEOBundle seoProfile={seoProfile} theme={theme} />
        <GlobalStyles theme={theme} />
        <ThemeProvider theme={theme}>
          <StyledPage egged={egged}>
            {bgDesign !== "none" && (
              <ParticleBackground
                design={bgDesign}
                color={bgColor || theme.accent}
                egged={egged}
              />
            )}
            <Nav
              showSideBar={showSideBar}
              handleToggle={this.toggleNav}
              accent={theme.accent}
            />
            {children}
            <Footer />
            <Konami easterEgg={this.onKonami} />
          </StyledPage>
        </ThemeProvider>
      </>
    )
  }
}

export default Page
