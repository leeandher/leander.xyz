import styled from "styled-components"

export const PageSection = styled.section`
  position: relative;
  h2 {
    font-size: 3.5rem;
    text-align: center;
    text-decoration: underline ${({ theme }) => theme.accent};
  }
  div {
    margin: 0 auto;
    max-width: ${({ theme }) => theme.spacing.maxWidth};
    padding: 0 2rem;
  }
`

export const SkewedPageSection = styled(PageSection)`
  z-index: 0;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: skewY(${({ skew }) => skew});
    transform-origin: top left;
  }
`

export default PageSection
