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
  border: 3px solid ${({ theme }) => theme.accent};
  padding: 3rem;
  min-width: 320px;
  z-index: 0;
  * {
    z-index: 2;
  }
  h2 {
    margin: 0;
  }
  &:before {
    height: 100%;
    width: 100%;
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    max-width: 0;
    background: ${({ theme }) => theme.accent};
    ${({ theme }) => theme.transition.default("all")};
  }
  &:hover&:before {
    max-width: 2.5rem;
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

const MediaLink = ({ date, image, path, preview, tags, title }) => {
  return (
    <StyledLink to={path} image={image}>
      <img src="/apple-touch-icon.png" alt={`Header image for ${title}`} />
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{preview}</p>
      <ul>
        {tags.map(tag => (
          <Tag tag={tag} key={Math.random()} />
        ))}
      </ul>
    </StyledLink>
  )
}
export default MediaLink
