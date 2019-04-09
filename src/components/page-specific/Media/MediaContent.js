import styled from "styled-components"

const MediaContent = styled.main`
  margin: 0 auto;
  padding: 1rem 4rem;
  p {
    margin: 2.5rem 0;
  }
  figure {
  }

  img {
    box-sizing: content-box;
    padding: 1rem;
    border: 2px solid ${({ theme }) => theme.accent};
    max-width: 100%;
    display: block;
    margin: 1rem auto;
  }
  figcaption {
    text-align: center;
    font-style: italic;
    color: ${({ theme }) => theme.shade.mid};
  }
`

export default MediaContent
