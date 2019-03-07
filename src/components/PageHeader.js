import React from "react"
import styled from "styled-components"

import ParticleBackground from "./ParticleBackground"

const Wrapper = styled.header`
  display: flex;
  border: 3px solid orange;
  box-sizing: border-box;
`
const Play = styled(ParticleBackground)`
  background: black;
`

const PageHeader = ({ children, height, design }) => {
  return (
    <Wrapper style={{ height }}>
      <Play design={design} height={height} />
      {children}
    </Wrapper>
  )
}

export default PageHeader
