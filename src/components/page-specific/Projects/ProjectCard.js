import React from "react"
import styled from "styled-components"
import { animated } from "react-spring"
import { Link } from "gatsby"
import { FaGithub, FaLink } from "react-icons/fa"

import Tag from "../../Tag"

import { media, themer } from "../../../styles/helpers"

const Card = styled(animated.div)`
  background: ${themer("shade.lightest")};
  border: 1rem solid ${themer("accent")};
  margin: 1.5rem;
  border-radius: 1.5rem;
  overflow: hidden;
  max-width: 560px;
  text-align: center;
  h2 {
    transform: skewY(-4deg);
    margin-top: -3rem;
    margin-bottom: 3rem;
    padding: 1.5rem 0;
    background: ${themer("shade.darkest")};
    color: ${themer("shade.lightest")};
  }
  time {
    font-style: italic;
    margin: 0 auto;
    padding: 0.5rem;
  }
`

const HeaderImage = styled.figure`
  margin: 0;
  background: ${themer("accent")};
  height: 300px;
  overflow: hidden;
  margin-bottom: -5rem;
  object-fit: fill;
  pointer-events: none;
  img {
    pointer-events: none;
    max-width: 100%;
  }
`

const TagWrapper = styled.div`
  text-align: left;
  margin: 2.5rem 2rem;
  ${media.phone`
    display: none;
  `}
`

const Description = styled.p`
  font-weight: 300;
  margin: 2rem;
  text-align: left;
  ${media.tablet`
    display: none;
  `}
`

const MoreInfoLink = styled(Link)`
  font-weight: bold;
  text-align: center;
  font-size: 2rem;
  padding: 2rem;
  display: block;
  background: linear-gradient(
    ${themer("shade.lightest")} 15%,
    ${themer("accent")}
  );
  ${({ theme }) => theme.transition.default("all")};
  &:active,
  &:focus,
  &:hover {
    letter-spacing: 2px;
  }
`

const ExternalLinkWrapper = styled.div`
  display: flex;
  background: ${themer("accent")};
  a {
    ${({ theme }) => theme.transition.default("all")};
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    padding: 0.5rem;
    align-items: center;
    border-radius: 0.5rem;
    &:active,
    &:focus,
    &:hover {
      background: ${themer("shade.lightest")};
    }
  }
`

const ProjectCard = ({
  date,
  image,
  description,
  slug,
  title,
  repo,
  link,
  tech,
  ...restOfProps
}) => {
  const altText = `Screenshot of ${title}`
  return (
    <Card {...restOfProps}>
      <HeaderImage>
        <img src={image} alt={altText} title={altText} draggable={false} />
      </HeaderImage>
      <h2>{title}</h2>
      <time>{date}</time>
      <TagWrapper>
        {tech.map(techItem => (
          <Tag key={techItem} tag={techItem} />
        ))}
      </TagWrapper>
      <Description>{description}</Description>
      <hr />
      <MoreInfoLink to={`/projects/${slug}`}>More Info?</MoreInfoLink>
      <ExternalLinkWrapper>
        {repo.length > 0 ? (
          <a href={repo} className="left">
            <FaGithub />
            View the Code
          </a>
        ) : null}
        {link.length > 0 ? (
          <a href={link} className="right">
            <FaLink />
            View it Live
          </a>
        ) : null}
      </ExternalLinkWrapper>
    </Card>
  )
}

export default ProjectCard
