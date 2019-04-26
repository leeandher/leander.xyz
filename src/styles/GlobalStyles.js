import { withPrefix } from "gatsby"
import { createGlobalStyle } from "styled-components"
import { themer } from "./helpers"

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  @font-face {
    font-family: dm;
    src: url(${withPrefix("fonts/dm.ttf")});
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.75rem;
    line-height: 1.5;
    font-family: ${({ theme }) => theme.font.base};
    scrollbar-color: ${({ theme }) =>
      `${theme.accent} ${theme.shade.lightest}`};
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 1rem;
      background: ${({ theme }) => theme.shade.darker};
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.accent};
      border-radius: 2rem;
    }
  }
  code {
    font-family: ${({ theme }) => theme.font.mono} !important;
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
    background: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.accent}88;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 10px ${({ theme }) => theme.accent};
  }
  #nprogress {
    pointer-events: none;
    .bar {
      background: #fefefe;
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
      box-shadow: 0 0 10px #fefefe, 0 0 5px #fefefe;
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
`

export default GlobalStyles
