import React from 'react'
import Particles from 'react-particles-js'
import styled from 'styled-components'

import bubbles from '../data/bubbles.json'
import mesh from '../data/mesh.json'

const Wrapper = styled.div`
  z-index: -1;
  width: 100%;
  position: absolute;
  max-height: 100%;
  top: 0;
  left: 0;
`

const ParticleBackground = ({ className, design, height }) => {
  const particleData = (styleId => {
    switch (styleId) {
      case 'bubbles':
        return bubbles
      case 'mesh':
        return mesh
    }
  })(design)
  return (
    <Wrapper>
      <Particles className={className} height={height} params={particleData} />
    </Wrapper>
  )
}

export default ParticleBackground
