import React from "react"
import styled from "styled-components"
import { themer } from "../../../styles/helpers"

import Tag from "../../Tag"

const SectionWrapper = styled.div``

const PanelWrapper = styled.div`
  padding: 1rem;
  margin: 1.5rem;
  display: block;
`

const Category = styled.h4`
  margin: 1.5rem;
  margin-left: 4rem;
  font-size: 2rem;
  span {
    position: relative;
    padding: 0.5rem 1rem;
    z-index: 0;
    &:before {
      ${themer("before")};
      transform: skew(-12deg);
      background: ${themer("accent")};
      opacity: ${themer("opacity.faded")};
    }
  }
`

const Attribute = styled(Tag)`
  margin: 0.5rem;
  font-weight: normal;
  font-family: ${themer("font.mono")};
  background: ${themer("shade.lighter")}88;
  &:before {
    content: ">  ";
    color: ${themer("accent")};
    margin-left: -1.5rem;
    font-weight: bold;
    position: absolute;
  }
`
const Disclaimer = styled.p`
  margin: 0 auto;
  font-size: 1.6rem;
  max-width: 550px;
  text-align: center;
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
            <Attribute key={`${attribute}-${j}`} tag={attribute} />
          ))}
        </PanelWrapper>
      ))}
      <Disclaimer>
        Disclaimer: One of these guys in every category is a joke. Just warning
        you in case 'Reverse Parking' sounded like a backend database library.
      </Disclaimer>
    </SectionWrapper>
  )
}

export default CharacterSheetWrapper
