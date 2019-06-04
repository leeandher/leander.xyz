import React from "react"
import styled from "styled-components"

const TextWrap = styled.div`
  font-weight: 300;
  font-size: 1.6rem;
  margin: 1rem 0 1rem 2rem;
`

const GenText = ({ children }) => {
  return <TextWrap>{children}</TextWrap>
}

export default GenText
