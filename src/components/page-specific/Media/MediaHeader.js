import styled from "styled-components"

const MediaHeader = styled.header`
  padding: 10rem;
  button {
    color: white;
    font-style: italic;
    font-family: ${({ theme }) => theme.font.mono};
  }
`

export default MediaHeader
