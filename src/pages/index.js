import React from 'react'
import Particles from 'react-particles-js'

const particleData = require('../data/particlesjs-config.json')

const Home = () => {
  return (
    <div>
      <h2>Testing</h2>
      <Particles width="100vw" height="100vh" params={particleData} />
    </div>
  )
}

export default Home
