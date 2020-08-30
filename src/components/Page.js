import React from "react"
import styled, { css, ThemeProvider } from "styled-components"
import Konami from "react-konami"

import GlobalStyles from "../styles/GlobalStyles"
import { palette } from "../styles/palette"

import Nav from "./Nav"
import Footer from "./Footer"
import SEOBundle from "./SEOBundle"
import ParticleBackground from "./ParticleBackground"

import { genComputedProperty } from "../helpers"
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
    // eslint-disable-next-line no-alert
    alert("Do you taste the rainbow?")
  }

  render() {
    const {
      accentKey,
      bgColor,
      bgDesign,
      children,
      seoImage,
      seoProfile,
      seoTitle,
      seoDescription,
    } = this.props
    const { egged, showSideBar } = this.state
    const theme = {
      accent: Object.prototype.hasOwnProperty.call(palette.color, accentKey)
        ? palette.color[accentKey]
        : genComputedProperty(accentKey, palette.color, true),
      ...palette,
    }
    return (
      <>
        <SEOBundle
          image={seoImage}
          profile={seoProfile}
          theme={theme}
          title={seoTitle}
          description={seoDescription}
        />
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
