import React from "react"
import Particles from "react-particles-js"
import styled from "styled-components"

import bubbles from "../data/particles/bubbles.json"
import mesh from "../data/particles/mesh.json"
import snow from "../data/particles/snow.json"
import space from "../data/particles/space.json"

import { genRand } from "../helpers"

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  max-height: 150%;
  top: 0;
  z-index: -1;
  left: 0;
`

const ParticleBackground = ({ accent, design, height, ...props }) => {
  function particleData(styleId) {
    const dataSets = ["bubbles", "mesh", "snow", "space"]
    const randIndex = genRand(0, dataSets.length - 1, true)
    switch (styleId) {
      case "bubbles":
        bubbles.particles.color.value = accent
        return bubbles
      case "mesh":
        mesh.particles.line_linked.color = accent
        return mesh
      case "snow":
        snow.particles.color.value = accent
        return snow
      case "space":
        space.particles.color.value = accent
        return space
      case "random":
      default:
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
