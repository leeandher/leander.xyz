import React from "react"
import styled from "styled-components"
import Typist from "react-typist"

import { themer } from "../../../styles/helpers"

themer("accent")

const StyledTyping = styled(Typist).attrs({
  cursor: {
    hideWhenDone: true,
    hideWhenDoneDelay: 2000,
  },
})`
  min-height: 45px;
  span {
    text-decoration: underline ${themer("accent")};
    font-family: ${themer("font.mono")};
    font-weight: bold;
  }
  .Cursor {
    color: ${themer("accent")};
    width: 0px;
    display: inline-block;
    text-decoration: none;
    margin-left: -5px;
    opacity: 1;
    animation: blink 0.5s step-end infinite;
    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`

const Typer = ({ descriptors }) => (
  <StyledTyping>
    {descriptors.map((descriptor, index, arr) => (
      <span key={index}>
        <span>{descriptor}</span>
        <Typist.Backspace
          count={index === arr.length - 1 ? 0 : descriptor.length}
          delay={2250}
        />
      </span>
    ))}
  </StyledTyping>
)

export default Typer
