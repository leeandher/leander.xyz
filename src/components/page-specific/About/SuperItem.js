import React, { useState } from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const Button = styled(animated.button)`
  border: 0;
  padding: 2rem;
  background: transparent;
  font-family: inherit;
  font-weight: bold;
  &:hover,
  &:active,
  &:focus {
    cursor: pointer;
    .labelText {
      opacity: 1;
    }
  }
  .labelText {
    margin: 0;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    transform: skew(-10deg);
    color: ${themer("shade.darkest")};
    opacity: ${({ isRevealed }) => (isRevealed ? 1 : 0.5)};
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
    max-height: ${({ isRevealed }) => (isRevealed ? 300 : 0)}px;
    transition: all linear 2s;
    overflow: hidden;
    color: ${themer("shade.lightest")};
    font-size: 3rem;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 0;
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
      <p className="revealText">{revealText}</p>
    </Button>
  )
}

export default SuperItem
