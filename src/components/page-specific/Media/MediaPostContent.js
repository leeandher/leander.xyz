import styled from "styled-components"
import { themer } from "../../../styles/helpers"

const MediaPostContent = styled.div`
  text-align: right;
  margin: 2rem auto;
  padding: 1rem;
  .disclaimer {
    padding: 2rem;
    margin-top: 3rem;
    font-size: 1.3rem;
    text-align: center;
    color: ${themer("shade.mid")};
    a {
      font-size: 1.3rem;
      display: inline-block;
    }
  }
`

export default MediaPostContent
