import React from "react"
import styled from "styled-components"
import Typist from "react-typist"

import { descriptors } from "../../../data/home.json"

const StyledTyping = styled(Typist).attrs({
  cursor: {
    hideWhenDone: true,
    hideWhenDoneDelay: 2000,
  },
})`
  min-height: 45px;
  span {
    text-decoration: underline ${({ theme }) => theme.accent};
    font-family: ${({ theme }) => theme.font.mono};
    font-weight: bold;
  }
  .Cursor {
    color: ${({ theme }) => theme.accent};
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

const Typer = () => (
  <StyledTyping>
    {descriptors.map((str, i, arr) => (
      <span key={str}>
        {i === 1 ? <span>a bro</span> : ""}
        {i === 1 ? <Typist.Backspace count={3} delay={550} /> : ""}
        <span>{i === 1 ? str.slice(2) : str}</span>
        <Typist.Backspace
          count={i === arr.length - 1 ? 4 : str.length}
          delay={2250}
        />
      </span>
    ))}
  </StyledTyping>
)

export default Typer
