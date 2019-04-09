import styled from "styled-components"

import MainWrapper from "../../MainWrapper"

const ContentWrapper = styled(MainWrapper)`
  background: ${({ theme }) => theme.shade.lightest};
  transform: skewY(-5deg);
  margin: 0 auto;
  z-index: 100;
  position: relative;
  padding: 5rem 2rem;
  hr {
    border: 1px solid ${({ theme }) => theme.accent};
  }
  &:before,
  &:after {
    ${({ theme }) => theme.before}
    background: ${({ theme }) => theme.shade.lightest};
    transform: translateY(-100%);
  }
  &:after {
    transform: translateY(100%);
  }
`

export default ContentWrapper
