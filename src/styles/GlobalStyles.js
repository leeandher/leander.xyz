import { createGlobalStyle } from "styled-components"
import { media, themer } from "./helpers"

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.75rem;
    line-height: 1.5;
    font-family: ${themer("font.base")};
    scrollbar-color: ${themer("accent")} ${themer("shade.lightest")};
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 1rem;
      background: ${themer("shade.darker")};
    }
    &::-webkit-scrollbar-thumb {
      background: ${themer("accent")};
      border-radius: 2rem;
    }
  }
  code {
    font-family: ${themer("font.mono")} !important;
  }
  h1 {
    font-size: 6rem
  }
  h2  {
    font-size: 3.5rem;
  }
  h3, 
  h4, 
  h5 {
    font-size: 2.5rem;
  }
  a {
    font-size: 1.75rem;
    color: inherit;
    text-decoration: none;
  }
  Link, button {
    user-select: none;
  }
  mark,
  ::selection {
    background: ${themer("accent")};
    background: ${themer("accent")}88;
  }
  /* &:focus {
    outline: none;
    box-shadow: 0 0 10px ${themer("accent")};
  } */
  #nprogress {
    pointer-events: none;
    .bar {
      background: ${themer("shade.lightest")};
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
    }
    .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${themer("shade.lightest")}, 0 0 5px ${themer(
  "shade.lightest"
)};
      opacity: 1.0;
      transform: rotate(3deg) translate(0px, -4px);
    }
  }
  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
    #nprogress .bar {
      position: absolute;
    }
  }
  .md-base {
    margin: 0 auto;
    padding: 1rem ;
    ${media.tablet`
      padding: 1rem;
    `}
    p {
      position: relative;
      margin: 2.5rem 0;
    }
    time {
      text-align: center;
      display: block;
      font-style: italic;
      text-decoration: underline ${themer("accent")};
      &:before {
        content: "Last Updated: ";
      }
    }
    img {
      border: 2px solid ${themer("accent")};
      max-width: 100%;
      display: block;
      margin: 1rem auto;
    }
    a {
      font-weight: 500;
      background: ${themer("accent")}88;
      background: linear-gradient(
        transparent 65%,
        ${themer("accent")}88 65% 100%
      );
    }
    figcaption {
      text-align: center;
      font-style: italic;
      color: ${themer("shade.mid")};
    }
    li > p {
      margin: 0;
    }
  }
`

export default GlobalStyles
