import styled from "styled-components"

import MainWrapper from "../../MainWrapper"

const ContentWrapper = styled(MainWrapper)`
  background: ${({ theme }) => theme.shade.lightest};
  transform: skewY(-5deg);
  margin: 0 auto;
  z-index: 100;
  position: relative;
  padding: 5rem 2rem;
  h1 {
    font-size: 3.5rem;
    text-align: center;
  }
  h2 {
    font-size: 2.5rem;
    padding: 0.5rem;
    position: relative;
    &:before {
      ${({ theme }) => theme.before}
      background: ${({ theme }) => theme.accent};
      opacity: 0.2;
    }
  }
  h3 {
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 1px;
    text-align: left;
    position: relative;
    &:before {
      ${({ theme }) => theme.before}
      background: ${({ theme }) => theme.accent};
      top: 100%;
      height: 5%
    }
  }
  a, p {
    font-size: 1.7rem;
  }
  hr {
    border: 1px solid ${({ theme }) => theme.accent};
  }
  &:before,
  &:after {
    ${({ theme }) => theme.before}
    background: ${({ theme }) => theme.shade.lightest};
    transform: translateY(-90%);
  }
  &:after {
    transform: translateY(90%);
  }
`

export default ContentWrapper
