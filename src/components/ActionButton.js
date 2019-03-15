import React from "react"
import styled from "styled-components"

const ActionButton = styled.button`
  outline: 0;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.shade.darker};
  background: ${({ theme }) => theme.shade.lighter};
  color: ${({ theme }) => theme.shade.darker};
  padding: 1rem 1.5rem;
  font-size: 20rem;
  font-weight: 800;
  border-radius: 0.5rem;
  box-shadow: 0 0 0 0.25rem inset ${({ theme }) => theme.shade.darker};
  margin: 1rem;
  transition: all 0.2s ease;
  ${({ theme }) => theme.transition.default("color, box-shadow")};
  &:focus,
  &:hover {
    box-shadow: 0 -0.5rem inset ${({ theme }) => theme.accent};
    border: 2px solid ${({ theme }) => theme.accent};
  }
`

export default ActionButton
