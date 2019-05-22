import React from "react"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const BulletItem = styled.div`
 list-style: none;
margin: 1rem 0;
  &:before {
    display: inline-block;
    position: absolute;
    margin-left: -3rem;
    color: ${themer("accent")};
    content: "${({ bullet }) => bullet}";
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
