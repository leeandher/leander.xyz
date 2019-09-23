import React from "react"
import styled, { css } from "styled-components"

import { themer } from "../styles/helpers"

const StyledToggler = styled.button`
  height: 0;
  width: 0;
  padding: 0;
  background: transparent;
  border: 0px solid transparent;
  position: fixed;
  top: 15px;
  right: 15px;
  outline: 0;
  z-index: 1000;
  transform: skew(-6deg);
  border: 2px solid ${themer("shade.darkest")};
  ${({ theme }) => theme.transition.default("all")};
  background: ${themer("accent")};
  @media (max-width: 850px) {
    height: 50px;
    width: 50px;
  }
`
const Bars = styled.div`
  height: 100%;
  width: 100%;
  ${({ theme }) => theme.transition.default("all")};
  div {
    background: ${themer("shade.darkest")};
    height: 10%;
    margin: 15% auto;
    width: 80%;
    transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &#bt {
      margin-top: 20%;
    }
  }
  ${({ showSideBar }) => {
    if (showSideBar) {
      return css`
        #bt {
          transform: translateY(250%) rotate(315deg);
        }
        #bm {
          opacity: 0;
        }
        #bb {
          transform: translateY(-250%) rotate(-315deg);
        }
      `
    }
  }}
`

const Toggler = ({ handleToggle, showSideBar }) => (
  <StyledToggler onClick={handleToggle}>
    <Bars showSideBar={showSideBar}>
      <div id="bt" />
      <div id="bm" />
      <div id="bb" />
    </Bars>
  </StyledToggler>
)

export default Toggler
