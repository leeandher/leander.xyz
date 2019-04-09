import styled from "styled-components"

const MediaContent = styled.main`
  margin: 0 auto;
  padding: 1rem 4rem;
  p {
    margin: 2.5rem 0;
  }
  img {
    box-sizing: content-box;
    padding: 1rem;
    border: 2px solid ${({ theme }) => theme.accent};
    max-width: 100%;
    display: block;
    margin: 1rem auto;
  }
  a {
    position: relative;
    font-weight: 600;
    &:hover {
      transform: translate(-10px);
    }
    &:before {
      ${({ theme }) => theme.before}
      background: ${({ theme }) => theme.accent};
      top: 50%;
      height: 50%;
      opacity: 0.5;
    }
  }
  figcaption {
    text-align: center;
    font-style: italic;
    color: ${({ theme }) => theme.shade.mid};
  }
`

export default MediaContent