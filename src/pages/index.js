import React from 'react'
import styled from 'styled-components'

import PageTitle from '../components/PageTitle'
import PageHeader from '../components/PageHeader'

import palette from '../styles'

const Home = () => {
  return (
    <>
      <PageHeader design="bubbles" height="100vh">
        <PageTitle title="Hey there" />
      </PageHeader>
    </>
  )
}

export default Home
