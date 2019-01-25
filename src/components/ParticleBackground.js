import React from 'react'
import Particles from 'react-particles-js'
import bubbles from '../data/bubbles.json'
import mesh from '../data/mesh.json'

const ParticleBackground = ({ bgStyle, style }) => {
  const particleData = (styleId => {
    switch (styleId) {
    case 'bubbles':
      return bubbles
    case 'mesh':
      return mesh
    }
  })(bgStyle)
  return <Particles width="100vw" height="100vh" params={particleData} />
}

export default ParticleBackground
