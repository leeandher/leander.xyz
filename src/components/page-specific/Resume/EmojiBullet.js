import React from "react"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const BulletItem = styled.div`
  list-style: none;
  margin: 1rem 0 1rem 2rem;
  &:before {
    display: inline-block;
    position: absolute;
    margin-left: -3rem;
    color: ${themer("accent")};
    content: "${({ bullet }) => bullet}";
  }
  strong {
    font-weight: 500;
  }
  code {
      position: relative;
      display: inline-block;
      padding: 0 0.25rem;
      border-radius: 1rem;
      font-weight: bold;
      z-index: 0;
      &:before {
        ${themer("before")};
        border-radius: 3px;
        background: ${themer("accent")};
        opacity: 0.25;
      }
    }
    a {
      z-index: 0;
      position: relative;
      font-weight: 500;
      &:before {
        ${themer("before")};
        background: ${themer("accent")};
        height: 30%;
        top: 65%;
        opacity: ${themer("opacity.faded")};
      }
    }
`

const EmojiBullet = ({ children, emoji, ...restOfProps }) => {
  return (
    <BulletItem bullet={emoji || ">"} {...restOfProps}>
      {children}
    </BulletItem>
  )
}

export default EmojiBullet
