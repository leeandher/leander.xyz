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
  height: 125%;
  top: 0;
  z-index: -1;
  left: 0;
`
const BackgroundParticles = styled(Particles)`
  width: 100%;
  height: 100%;
`

const ParticleBackground = ({ color, design, ...restOfProps }) => {
  function particleData(styleId) {
    const dataSets = ["bubbles", "mesh", "snow", "space"]
    const randIndex = genRand(0, dataSets.length - 1, true)
    switch (styleId) {
      case "bubbles":
        bubbles.particles.color.value = color
        return bubbles
      case "mesh":
        mesh.particles.line_linked.color = color
        return mesh
      case "snow":
        snow.particles.color.value = color
        return snow
      case "space":
        space.particles.color.value = color
        return space
      case "random":
      default:
        return particleData(dataSets[randIndex])
    }
  }
  return (
    <Wrapper>
      <BackgroundParticles params={particleData(design)} {...restOfProps} />
    </Wrapper>
  )
}

export default ParticleBackground
