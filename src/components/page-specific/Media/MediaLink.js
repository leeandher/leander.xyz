import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { FaRegClock } from "react-icons/fa"

import Tag from "../../Tag"

const LinkWrapper = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.shade.lightest};
  margin: 1.5rem;
  position: relative;
  border: 0.5rem solid ${({ theme }) => theme.accent};
  max-width: 650px;
  border-radius: 1.5rem;
  padding: 3rem;
  min-width: 320px;
  overflow: hidden;
  transition: transform 0.2s ease-out;
  z-index: 0;
  * {
    z-index: 2;
  }
  .title {
    margin: 0;
    font-size: 3rem;
    font-weight: 500;
  }
  .description {
    font-size: 1.75rem;
    max-width: 100%;
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
  &:nth-child(3n)&:before {
    transform: skew(12deg);
  }
  &:hover,
  &:focus,
  &:active {
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

const LinkInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 300;
  .ttr {
    align-items: center;
    display: flex;
    margin: 0 5rem;
    svg {
      margin: 0 0.5rem;
      display: inline-block;
    }
    p {
      display: inline-block;
      font-style: italic;
      &:after {
        content: " min read";
      }
    }
  }
  time {
    font-style: italic;
    margin: 1rem 0;
    display: block;
  }
`

const MediaLink = ({
  date,
  image,
  description,
  tags,
  title,
  timeToRead,
  type,
  slug,
}) => {
  return (
    <LinkWrapper to={`/${type}/${slug}`} image={image}>
      <h2 className="title">{title}</h2>
      <LinkInfo>
        <time>{date}</time>
        <span className="ttr">
          <FaRegClock />
          <p>{timeToRead}</p>
        </span>
      </LinkInfo>
      <p className="description">{description}</p>
      {tags.sort().map(tag => (
        <Tag tag={tag} key={Math.random()} />
      ))}
    </LinkWrapper>
  )
}
export default MediaLink
