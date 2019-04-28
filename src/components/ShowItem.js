import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const WrapperLink = styled(Link)`
  color: ${({ theme }) => theme.shade.darker};
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
  box-shadow: 0 1.5rem 1.5rem  ${({ theme }) => theme.shade.lighter};
  text-align: center;
  ${({ theme }) => theme.transition.default("transform")};
  &:hover,
  &:focus {
    &:before {
      transform: scale(1.25);
    }
  }
  .title {
    margin: 0;
    display: inline;
    margin: 1.5rem;
    position: relative;
    transform: skewX(-4deg);
    font-weight: 500;
    span {
      padding: 0.5rem 1rem; 
      background: ${({ theme }) => theme.accent};
    }
  }
  .description {
    font-weight: 300;
    margin: 0;
  } 
  .wrapper {
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
    opacity: 0.2;
    background: url("${({ src }) => src}") transparent;
    transition: transform ease 0.4s;
  }
`

const ShowItem = ({ description, src, title, ...props }) => {
  return (
    <WrapperLink src={src} {...props}>
      <div className="wrapper">
        <h4 className="title">
          <span>{title}</span>
        </h4>
        <p className="description">{description}</p>
      </div>
    </WrapperLink>
  )
}

export default ShowItem
