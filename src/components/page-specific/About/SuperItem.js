import React, { useState } from "react"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const Button = styled.button`
  border: 0;
  padding: 3rem;
  border-radius: 2rem;
  background: transparent;
  font-family: inherit;
  position: relative;
  font-weight: bold;
  &:hover,
  &:active,
  &:focus {
    cursor: pointer;
    .label {
      opacity: 1;
    }
  }
  .label {
    margin: 0;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    transform: skew(-10deg);
    color: ${themer("shade.darkest")};
    opacity: ${({ isRevealed }) => (isRevealed ? 1 : 0.5)};
    padding: 0.5rem 1rem;
    display: inline-block;
    background: ${themer("shade.lightest")};
    &:before {
      content: "🔥 PICK";
      position: absolute;
      padding: 0.25rem 0.5rem;
      background: ${themer("shade.lightest")};
      bottom: 100%;
      left: 0;
      font-size: 1rem;
    }
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
  .value {
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

const SuperItem = ({ label, value, ...restOfProps }) => {
  const [isRevealed, reveal] = useState(false)
  return (
    <Button
      onClick={() => reveal(true)}
      isRevealed={isRevealed}
      {...restOfProps}
    >
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </Button>
  )
}

export default SuperItem
