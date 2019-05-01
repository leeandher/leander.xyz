import React, { useState } from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const Button = styled(animated.button)`
  border: 2px solid transparent;
  border-radius: 1.5rem;
  padding: 2rem;
  outline: 0;
  background: transparent;
  font-family: inherit;
  font-weight: bold;
  &:hover,
  &:active,
  &:focus {
    border-color: ${themer("accent")};
    .labelText {
      opacity: 1;
    }
  }
  .labelText {
    margin: 0;
    font-size: 2.5rem;
    transform: skew(-10deg);
    color: ${themer("shade.darkest")};
    ${({ isRevealed }) =>
      isRevealed
        ? `
          opacity: 1;
        `
        : `
          opacity: 0.5;
        `}
    padding: 0.5rem 1rem;
    display: inline-block;
    background: ${themer("shade.lightest")};
  }
  @keyframes oscillate {
    0% {
      color: ${themer("shade.lightest")};
      text-shadow: 0 0 5px ${themer("shade.lightest")};
    }
    50% {
      color: ${themer("accent")};
      text-shadow: 0 0 5px ${themer("accent")};
    }
    100% {
      color: ${themer("shade.lightest")};
      text-shadow: 0 0 5px ${themer("shade.lightest")};
    }
  }
  .revealText {
    max-height: ${({ isRevealed }) => (isRevealed ? 1000 : 0)}px;
    transition: all linear 2s;
    overflow: hidden;
    color: ${themer("shade.lightest")};
    font-size: 3rem;
    font-weight: 500;
    letter-spacing: 2px;
    animation: oscillate 3s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  }
`

const SuperItem = ({ labelText, revealText, ...restOfProps }) => {
  const [isRevealed, reveal] = useState(false)
  return (
    <Button
      onClick={() => reveal(true)}
      isRevealed={isRevealed}
      {...restOfProps}
    >
      <p className="labelText">{labelText}</p>
      <div className="revealText">{revealText}</div>
    </Button>
  )
}

export default SuperItem
