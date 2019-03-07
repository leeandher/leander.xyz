import React from "react"
import styled, { ThemeProvider } from "styled-components"

import ParticleBackground from "./ParticleBackground"

import { palette } from "./styles"

const Wrapper = styled.header`
  display: flex;
  border: 3px solid orange;
  box-sizing: border-box;
`
const Play = styled(ParticleBackground)`
  background: black;
`

const Page = ({ children, height, design }) => {
  return (
    <ThemeProvider theme={palette}>
      <Wrapper style={{ height }}>
        <Play design={design} height={height} />
        {children}
      </Wrapper>
    </ThemeProvider>
  )
}

export default Page
