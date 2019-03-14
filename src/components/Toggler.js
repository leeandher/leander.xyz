import React from "react"
import styled from "styled-components"

const StyledToggler = styled.button`
  height: 0;
  width: 0;
  background: transparent;
  border: 0px solid transparent;
  position: fixed;
  top: 15px;
  right: 15px;
  outline: 0;
  ${({ theme }) => theme.transition.default("all")};
  @media (max-width: 850px) {
    height: 50px;
    width: 50px;
    background: red;
  }
`

const Toggler = ({ showSideBar }) => (
  <>{showSideBar ? <StyledToggler /> : <StyledToggler />}</>
)

export default Toggler
