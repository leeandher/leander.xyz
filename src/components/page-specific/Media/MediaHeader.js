import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const MediaHeader = styled.header`
  padding: 10rem;
  button {
    color: white;
    font-style: italic;
    font-family: ${themer("font.mono")};
  }
`

export default MediaHeader
