import styled from "styled-components"
import { themer } from "../styles/helpers"

const AnchorLink = styled.a`
  text-align: center;
  background: transparent;
  position: relative;
  color: ${themer("accent")};
  transition: 0.2s ease color;
  &:before {
    content: "";
    height: 100%;
    max-height: 0;
    z-index: -1;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: ${themer("accent")};
    transition: 0.2s ease max-height;
  }
  &:focus,
  &:hover {
    color: ${themer("shade.darkest")};
    &:before {
      max-height: 100%;
    }
  }
`

export default AnchorLink
