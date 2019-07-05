import styled from "styled-components"

import { themer } from "../styles/helpers"

export const Default = styled.section`
  position: relative;
  .title {
    font-size: 3.5rem;
    text-align: center;
    text-decoration: underline ${themer("accent")};
  }
  .subtitle {
    text-align: center;
    font-weight: 300;
  }
`

export const Skewed = styled(Default)`
  z-index: 0;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: skewY(${({ skew }) => skew});
    transform-origin: top left;
  }
`
export const Sharp = styled(Default)`
  z-index: 0;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: skewY(${({ skew }) => skew});
    transform-origin: top left;
  }
`
