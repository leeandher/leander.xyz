import React from "react"
import Particles from "react-particles-js"
import styled from "styled-components"

import bubbles from "../data/bubbles.json"
import mesh from "../data/mesh.json"

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  max-height: 100%;
  top: 0;
  z-index: -1;
  left: 0;
`

const ParticleBackground = ({ accent, design, height, ...props }) => {
  const particleData = (styleId => {
    switch (styleId) {
      case "bubbles":
        return bubbles
      case "mesh":
        mesh.particles.line_linked.color = accent
        return mesh
    }
  })(design)
  return (
    <Wrapper>
      <Particles height={height} params={particleData} {...props} />
    </Wrapper>
  )
}

export default ParticleBackground
