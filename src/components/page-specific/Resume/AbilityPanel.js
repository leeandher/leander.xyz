import React from "react"
import styled from "styled-components"
import { themer } from "../../../styles/helpers"

const PanelWrapper = styled.div`
  padding: 1rem;
  margin: 1.5rem;
  display: inline-block;
`

const Category = styled.h4`
  margin: 0;
  font-family: ${themer("font.mono")};
  font-size: 2rem;
`

const Attribute = styled.p`
  margin: 0;
  padding: 0.25rem;
  font-size: 1.35rem;
  &:before {
    content: ">  ";
    color: ${themer("accent")};
  }
`

const AbilityPanel = ({ category, attributes }) => {
  return (
    <PanelWrapper>
      <Category>{category}</Category>
      {attributes.map((attribute, i) => (
        <Attribute key={`${attribute}-${i}`}>{attribute}</Attribute>
      ))}
    </PanelWrapper>
  )
}

export default AbilityPanel
