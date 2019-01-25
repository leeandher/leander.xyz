import React from 'react'
import styled from 'styled-components'

import ParticleBackground from '../components/ParticleBackground'
import PageTitle from '../components/PageTitle'

const HomeBackground = styled(ParticleBackground)`
  background: linear-gradient(#000000, dimgrey);
`

const Home = () => {
  return (
    <>
      <HomeBackground design="bubbles" />
      <PageTitle content={'Hey there!'} />
    </>
  )
}

export default Home
