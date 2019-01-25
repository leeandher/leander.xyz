import React from 'react'
import styled from 'styled-components'

const StyledPageTitle = styled.h1`
  font-family: 'Rubik Mono One';
  font-weight: normal;
  text-align: center;
  letter-spacing: 2px;
  background: rgba(114, 221, 247, 0.4);
  transform: skew(10deg);
  color: white;
  display: inline-block;
  margin: 50px;
  padding: 5px 15px;
`

const PageTitle = ({ content }) => {
  return (
    <>
      <StyledPageTitle>{content}</StyledPageTitle>
    </>
  )
}

export default PageTitle
