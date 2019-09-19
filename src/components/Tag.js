import React from "react"
import styled from "styled-components"

import Button from "./Button"

import { themer } from "../styles/helpers"

const TagButton = styled(Button)`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0.25rem;
  background: ${themer("shade.lighter")};
  color: ${themer("shade.darker")};
  overflow: hidden;
`

const Tag = ({ tag, ...props }) => (
  <TagButton disabled {...props}>
    {tag}
  </TagButton>
)

export default Tag
