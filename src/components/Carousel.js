import styled from "styled-components"

import { themer } from "../styles/helpers"

const Carousel = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding: 3rem 2rem 5rem;
  border-radius: 2rem;
  margin: 2rem;
  &::-webkit-scrollbar {
    height: 1.25rem;
    border: 2px solid ${themer("accent")};
    border-radius: 1.25rem;
  }
  &::-webkit-scrollbar-thumb {
    background: ${themer("accent")};
    padding: -0.5rem !important;
    width: 10px;
    border-radius: 1.25rem;
  }
`

export default Carousel
