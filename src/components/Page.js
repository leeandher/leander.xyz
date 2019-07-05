import React from "react"
import styled, { ThemeProvider } from "styled-components"

import GlobalStyles from "../styles/GlobalStyles"
import { palette } from "../styles/palette"

import Nav from "./Nav"
import Footer from "./Footer"
import SEOBundle from "./SEOBundle"
import ParticleBackground from "./ParticleBackground"

// import { consoleLiteral } from "../data/consoleLiteral"
import { genRandProperty } from "../helpers"

const StyledPage = styled.div`
  margin-top: ${({ theme }) => theme.constants.navBarHeight};
`

class Page extends React.Component {
  state = {
    showSideBar: false,
  }

  toggleNav = () => {
    const { showSideBar } = this.state
    this.setState({ showSideBar: !showSideBar })
  }

  // componentDidMount() {
  //   console.clear()
  //   console.log(consoleLiteral)
  // }

  render() {
    const { accent, bgColor, children, bgDesign, seoProfile } = this.props
    const { showSideBar } = this.state
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
          <StyledPage>
            {bgDesign !== "none" && (
              <ParticleBackground
                design={bgDesign}
                color={bgColor || theme.accent}
              />
            )}
            <Nav
              showSideBar={showSideBar}
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
