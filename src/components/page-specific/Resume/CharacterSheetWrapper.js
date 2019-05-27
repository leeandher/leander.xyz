import React from "react"
import styled from "styled-components"
import { themer } from "../../../styles/helpers"

const SectionWrapper = styled.div`
  display: flex;
  align-items: top;
  flex-flow: row wrap;
  justify-content: center;
`

const PanelWrapper = styled.div`
  padding: 1rem;
  margin: 1.5rem;
  display: inline-block;
  width: 200px;
`

const Category = styled.h4`
  margin: 0;
  font-family: ${themer("font.mono")};
  font-size: 2rem;
  span {
    padding: 0.25rem 1rem;
    position: relative;
    z-index: 0;
    &:before {
      ${themer("before")};
      transform: skew(-12deg);
      background: ${themer("accent")};
      opacity: ${themer("opacity.faded")};
    }
  }
`

const Attribute = styled.p`
  margin: 0;
  padding: 0.25rem;
  font-size: 1.35rem;
  &:before {
    content: ">  ";
    color: ${themer("accent")};
    margin-left: -1.5rem;
    font-weight: bold;
    position: absolute;
  }
`

const CharacterSheetWrapper = ({ characterSheetData }) => {
  return (
    <SectionWrapper>
      {characterSheetData.map(({ category, attributes }, i) => (
        <PanelWrapper key={i}>
          <Category>
            <span>{category}</span>
          </Category>
          {attributes.map((attribute, j) => (
            <Attribute key={`${attribute}-${j}`}>{attribute}</Attribute>
          ))}
        </PanelWrapper>
      ))}
    </SectionWrapper>
  )
}

export default CharacterSheetWrapper
