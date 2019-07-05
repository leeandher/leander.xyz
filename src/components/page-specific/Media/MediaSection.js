import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const MediaSection = styled.article`
  position: relative;
  padding: 0;
  transform: skewY(5deg);
  overflow: hidden;
  border: 0.5rem solid ${themer("accent")};
  border-width: 0.5rem 0;
  &:before {
    ${themer("before")}
    background: ${themer("shade.dark")};
    opacity: 0.75;
  }
`

export default MediaSection
