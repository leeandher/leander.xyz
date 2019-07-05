import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"

import { themer } from "../../../styles/helpers"

const StyledPanel = styled(Link)`
  flex: 1;
  text-align: center;
  min-width: 25rem;
  min-height: 30rem;
  ${({ theme }) => theme.transition.default("all")};
  background: ${themer("shade.lighter")};
  color: ${themer("shade.lighter")};
  box-shadow: 0 8px 15px ${themer("shade.darker")};
  margin: 1rem;
  overflow: hidden;
  border-radius: 1.5rem;
  &:hover,
  &:focus {
    transform: translateY(-5px);
    box-shadow: none;
    background: ${({ theme, accent }) => theme.color[accent]};
    color: ${({ theme, accent }) => theme.color[accent]};
  }
  p {
    font-size: 2rem;
    font-weight: lighter;
    margin: -2rem 0 2rem;
    font-weight: ${themer("font.light")};
    color: ${themer("shade.dark")};
  }
  h4 {
    font-size: 4rem;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 0;
    font-style: italic;
    background: ${themer("shade.darker")};
  }
  svg {
    margin: 3.5rem;
    font-size: 5rem;
    color: ${themer("shade.darker")};
  }
`

const QuoteCard = ({ accent, mainText, preText, to }) => (
  <StyledPanel accent={accent} to={to}>
    <FaQuoteLeft />
    <p>{preText}</p>
    <h4>{mainText}</h4>
    <FaQuoteRight />
  </StyledPanel>
)

export default QuoteCard
