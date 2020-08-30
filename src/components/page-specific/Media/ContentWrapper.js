import styled from "styled-components"

import MainWrapper from "../../MainWrapper"

import { media, themer } from "../../../styles/helpers"

const ContentWrapper = styled(MainWrapper)`
  background: ${themer("shade.lightest")};
  transform: skewY(-5deg);
  margin: 0 auto;
  position: relative;
  padding: 5rem 2rem;
  ${media.tablet`
    padding: 5rem 0.5rem;
  `}
  h1 {
    font-size: 3.5rem;
    text-align: center;
  }
  h2 {
    font-size: 2.5rem;
    padding: 0.5rem;
    position: relative;
    &:before {
      ${themer("before")};
      background: ${themer("accent")};
      opacity: 0.5;
    }
  }
  h3 {
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 1px;
    text-align: left;
    position: relative;
    &:before {
      ${themer("before")};
      background: ${themer("accent")};
      top: 100%;
      height: 5%;
    }
  }
  a,
  p {
    font-size: 1.7rem;
  }
  hr {
    border: 1px solid ${themer("accent")};
  }
  code {
    position: relative;
    &:before {
      ${themer("before")};
      background: ${themer("accent")};
      opacity: 0.2;
    }
  }
  li {
    margin: 2.5rem;
  }
  blockquote {
    background: ${themer("accent")}22;
    border: 0 solid ${themer("accent")};
    border-width: 0 0 0 0.5rem;
    padding-left: 1.5rem;
  }
  pre {
    border: 2px solid ${themer("accent")};
    padding: 1rem;
    &::-webkit-scrollbar {
      height: 1rem;
      border: 0px solid ${themer("accent")};
      border-top-width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${themer("accent")};
      padding: -0.5rem !important;
      width: 10px;
    }
  }
  &:before,
  &:after {
    ${themer("before")};
    background: ${themer("shade.lightest")};
    transform: translateY(-99%);
  }
  &:after {
    transform: translateY(99%);
  }
`

export default ContentWrapper
