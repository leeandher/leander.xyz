import React from "react"
import Particles from "react-particles-js"
import styled from "styled-components"

import bubbles from "../data/bubbles.json"
import mesh from "../data/mesh.json"
import space from "../data/space.json"

import { genRand } from "../helpers/random"

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  max-height: 100%;
  top: 0;
  z-index: -1;
  left: 0;
`

const ParticleBackground = ({ accent, design, height, ...props }) => {
  function particleData(styleId) {
    switch (styleId) {
      case "bubbles":
        bubbles.particles.color.value = accent
        return bubbles
      case "mesh":
        mesh.particles.line_linked.color = accent
        return mesh
      case "space":
        space.particles.color.value = accent
        return space
      case "random":
      default:
        const dataSets = ["bubbles", "mesh", "space"]
        const randIndex = genRand(0, dataSets.length - 1, true)
        return particleData(dataSets[randIndex])
    }
  }
  return design === "none" ? null : (
    <Wrapper>
      <Particles height={height} params={particleData(design)} {...props} />
    </Wrapper>
  )
}

export default ParticleBackground
