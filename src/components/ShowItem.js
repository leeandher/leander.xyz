import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { themer } from "../styles/helpers"

const WrapperLink = styled(Link)`
  color: ${themer("shade.darker")};
  padding: 1.5rem 1rem;
  display: inline-block;
  z-index: 2;
  width: 320px;
  white-space: initial;
  height: 500px;
  margin: 2rem;
  border-radius: 1.5rem;
  box-sizing: content-box;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1.5rem 1.5rem  ${themer("shade.lighter")};
  text-align: center;
  ${({ theme }) => theme.transition.default("transform")};
  &:hover,
  &:focus {
    &:before {
      transform: scale(1.25);
    }
  }
  .show-title {
    margin: 0;
    display: inline;
    margin: 1.5rem;
    position: relative;
    transform: skewX(-4deg);
    font-weight: 500;
    font-size: 2.5rem;
    span {
      position: relative;
      padding: 0.5rem; 
    }
    span:before {
      ${themer("before")};
      background: ${themer("accent")};
      
    }
  }
  .show-description {
    font-weight: 300;
    margin:  0 -1rem;
    padding: 1rem;
    background: ${themer("shade.lightest")};
    
  } 
  .show-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 75%;
  }
  &:before {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background: url("${({ image }) => image}") transparent;
    transition: transform ease 0.4s;
  }
`

const ShowItem = ({ description, image, title, ...restOfProps }) => {
  return (
    <WrapperLink image={image} {...restOfProps}>
      <div className="show-wrapper">
        <h4 className="show-title">
          <span>{title}</span>
        </h4>
        {description ? <p className="show-description">{description}</p> : null}
      </div>
    </WrapperLink>
  )
}

export default ShowItem
