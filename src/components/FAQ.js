import React from "react"
import styled from "styled-components"

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
  &:before {
    ${({ theme }) => theme.before}
    transition: 0.75s max-width ease-out;
    background: ${({ theme }) => theme.accent};
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
    text-decoration: underline ${({ theme }) => theme.accent};
  }
`

const FAQ = ({ answer, question, ...props }) => {
  return (
    <Wrapper {...props}>
      <Details open>
        <Summary>{question}</Summary>
        <p>{answer}</p>
      </Details>
    </Wrapper>
  )
}

export default FAQ
