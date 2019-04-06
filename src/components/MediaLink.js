import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Tag from "./Tag"

const StyledLink = styled(Link)`
  border: 2px solid rebeccapurple;
  display: block;
  background: ${({ theme }) => theme.shade.lightest};
  margin: 1.5rem;
  position: relative;
  border: 0.5rem solid ${({ theme }) => theme.accent};
  border-radius: 1.5rem;
  padding: 3rem;
  max-width: 320px;
  overflow: hidden;
  transition: transform 0.2s ease-out;
  z-index: 0;
  * {
    z-index: 2;
  }
  h2 {
    margin: 0;
  }
  &:before {
    height: 100%;
    width: 200%;
    content: "";
    position: absolute;
    top: 0;
    transform: skew(-12deg);
    right: 5%;
    z-index: -1;
    max-width: 7rem;
    background: ${({ theme }) => theme.accent};
    transition: max-width 0.4s ease;
    transform: skewX(${({ skew }) => skew}deg);
  }
  &:nth-child(2n)&:before {
    transform: skew(12deg);
  }
  &:hover {
    transform: scale(1.03);
    &:before {
      max-width: 2.5rem;
    }
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 320px;
    z-index: -1;
    filter: grayscale(1);
    opacity: 0.1;
  }
`

const MediaLink = ({
  arrangement,
  date,
  image,
  path,
  preview,
  tags,
  title,
}) => {
  return (
    <StyledLink to={path} image={image}>
      {/* <img src="/icons/apple-touch-icon.png" alt={title} /> */}
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{preview}</p>
      {tags.map(tag => (
        <Tag tag={tag} key={Math.random()} />
      ))}
    </StyledLink>
  )
}
export default MediaLink