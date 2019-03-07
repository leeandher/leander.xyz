import React from "react"
import styled from "styled-components"

import { palette } from "./styles"

const StyledPageTitle = styled.h1`
  font-family: ${palette.font.family};
  border: 2px solid ${palette.color.red};
  color: ${palette.shade.lighter};
  margin: 50px;
  padding: 5px 15px;
`

const PageTitle = ({ title }) => {
  return (
    <>
      <StyledPageTitle>{title}</StyledPageTitle>
    </>
  )
}

export default PageTitle
