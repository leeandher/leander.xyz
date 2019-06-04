import styled from "styled-components"

const MediaPreContent = styled.div`
  margin: 0 2rem;
  color: ${({ theme }) => theme.shade.dark};
  h1 {
    font-size: 3rem;
    margin: 1.5rem 0;
    transform: skew(-6deg);
    display: inline-block;
    span {
      background: ${({ theme }) => theme.accent};
      padding: 1rem 2rem;
      color: ${({ theme }) => theme.shade.darkest};
    }
  }
  p {
    font-weight: 300;
  }
  svg {
    box-sizing: content-box;
    font-size: 3rem;
  }
  a {
    line-height: 1;
    display: inline-block;
    padding: 2rem;
    margin: 1rem;
    border-radius: 100%;
    overflow: hidden;
    border: 2px solid ${({ theme }) => theme.accent};
    &:hover,
    &:active,
    &:focus {
      border: 2px solid ${({ theme }) => theme.shade.darkest};
    }
  }
  time {
    font-size: 2rem;
    font-style: italic;
  }
`

export default MediaPreContent
