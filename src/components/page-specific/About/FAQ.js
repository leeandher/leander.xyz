import React from "react"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const Wrapper = styled.div``

const Details = styled.details`
  padding: 2rem;
  summary:before {
    max-width: 0%;
  }
  &[open] summary:before {
    max-width: 100%;
  }
  p {
    animation: sweep 0.75s ease-out;
  }
  a {
    font-weight: 500;
    background: ${themer("accent")}88;
    background: linear-gradient(
      transparent 65%,
      ${themer("accent")}88 65% 100%
    );
  }
  @keyframes sweep {
    0% {
      opacity: 0;
      transform: translateY(20%);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`
const Summary = styled.summary`
  padding: 1rem;
  font-weight: 600;
  position: relative;
  font-size: 2rem;
  &::-webkit-details-marker {
    color: ${themer("accent")};
  }
  &:before {
    ${themer("before")}
    transition: 0.75s max-width ease-out;
    background: ${themer("accent")};
    height: 0.5rem;
    top: 100%;
  }
  &:hover {
    cursor: pointer;
  }
  &:focus,
  &:active,
  &:hover {
    outline: 0;
  }
`

const FAQ = ({ answer, children, question, ...props }) => {
  return (
    <Wrapper {...props}>
      <Details>
        <Summary>{question}</Summary>
        {children}
      </Details>
    </Wrapper>
  )
}

export default FAQ
