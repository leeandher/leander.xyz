import styled from "styled-components"

const MediaSection = styled.article`
  position: relative;
  padding: 0;
  transform: skewY(5deg);
  overflow: hidden;
  border: 0.5rem solid ${({ theme }) => theme.accent};
  border-width: 0.5rem 0;
  &:before {
    ${({ theme }) => theme.before}
    background: ${({ theme }) => theme.shade.dark};
    opacity: 0.75;
  }
`

export default MediaSection
