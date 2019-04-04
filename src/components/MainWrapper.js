import styled from "styled-components"

const MainWrapper = styled.div`
  margin: 0 auto;
  max-width: ${({ maxWidth, theme }) => maxWidth || theme.spacing.maxWidth};
  min-width: ${({ minWidth, theme }) => minWidth || theme.spacing.minWidth};
  padding: 2rem;
`

export default MainWrapper
