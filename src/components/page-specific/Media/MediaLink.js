import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { FaRegClock } from "react-icons/fa"

import Tag from "../../Tag"

import { themer } from "../../../styles/helpers"

const LinkWrapper = styled(Link)`
  display: block;
  background: ${themer("shade.lightest")};
  ${({ image }) => image && css``}
  margin: 1.5rem;
  position: relative;
  border: 0.5rem solid ${themer("accent")};
  flex: 2 1;
  border-radius: 1.5rem;
  height: fit-content;
  padding: 3rem;
  min-width: 320px;
  max-width: 640px;
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
    background: ${themer("accent")};
    transition: all 0.4s ease;
    transform: skewX(${({ skew }) => skew}deg);
  }
  &:nth-child(2n)&:before {
    transform: skew(12deg);
  }
  &:hover,
  &:focus,
  &:active {
    transform: scale(1.03);
    img {
      filter: grayscale(0) blur(2px);
      opacity: 0.2;
    }
    &:before {
      max-width: 2.5rem;
    }
  }
  .image-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  img {
    position: absolute;
    object-fit: cover;
    transition: all 0.4s ease;
    z-index: -1;
    filter: grayscale(1) blur(6px);
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
    margin-left: 3rem;
    svg {
      margin: 0 0.5rem;
      display: inline-block;
    }
    p {
      display: inline-block;
      font-style: italic;
      &:before {
        content: "~";
      }
      &:after {
        content: " min";
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
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
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
