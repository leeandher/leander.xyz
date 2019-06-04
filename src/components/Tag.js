import React from "react"
import styled from "styled-components"

import Button from "./Button"

const TagButton = styled(Button)`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0.25rem;
  background: ${({ theme }) => theme.shade.lighter};
  color: ${({ theme }) => theme.shade.darker};
  overflow: hidden;
`

const Tag = ({ tag }) => <TagButton disabled>{tag}</TagButton>

export default Tag
