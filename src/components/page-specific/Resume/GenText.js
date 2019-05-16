import React from "react"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const TextWrap = styled.div`
  font-weight: 300;
  font-size: 1.6rem;
  em {
    font-weight: 500;
    text-decoration: underline ${themer("accent")};
  }
  li {
    display: block;
    margin: 3rem 1rem;
    &:before {
      display: inline-block;
      position: absolute;
      margin-left: -2rem;
      color: ${themer("accent")};
      font-weight: bold;
      content: ">";
    }
    code {
      position: relative;
      display: inline-block;
      padding: 0 0.25rem;
      border-radius: 1rem;
      font-weight: bold;
      z-index: 0;
      &:before {
        ${themer("before")};
        border-radius: 3px;
        background: ${themer("accent")};
        opacity: 0.25;
      }
    }
    a {
      z-index: 0;
      position: relative;
      font-weight: 500;
      &:before {
        ${themer("before")};
        background: ${themer("accent")};
        height: 30%;
        top: 65%;
        opacity: ${themer("opacity.faded")};
      }
    }
  }
`

const GenText = ({ children }) => {
  return <TextWrap>{children}</TextWrap>
}

export default GenText
