import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { FaGithub, FaLink } from "react-icons/fa"

import Tag from "../../Tag"

const Card = styled.div`
  background: ${({ theme }) => theme.shade.lightest};
  border: 1rem solid ${({ theme }) => theme.accent};
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
    background: ${({ theme }) => theme.shade.darkest};
    color: ${({ theme }) => theme.shade.lightest};
  }
  time {
    font-style: italic;
    margin: 0 auto;
    padding: 0.5rem;
  }
`

const HeaderImage = styled.figure`
  margin: 0;
  background: ${({ theme }) => theme.accent};
  height: 300px;
  overflow: hidden;
  margin-bottom: -5rem;
  object-fit: fill;
  img {
    max-width: 100%;
  }
`

const TagWrapper = styled.div`
  text-align: left;
  margin: 3.5rem 2rem;
`

const Description = styled.p`
  font-weight: 300;
  margin: 0.5rem 2rem;
  text-align: left;
`

const MoreInfoLink = styled(Link)`
  font-weight: bold;
  text-align: center;
  font-size: 2rem;
  padding: 2rem;
  display: block;
  background: linear-gradient(
    ${({ theme }) => `${theme.shade.lightest} 15%, ${theme.accent}`}
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
  background: ${({ theme }) => theme.accent};
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
      background: ${({ theme }) => theme.shade.lightest};
    }
  }
`

const ProjectCard = ({
  date,
  image,
  excerpt,
  slug,
  title,
  repo,
  link,
  tech,
}) => {
  const altText = `Screenshot of ${title}`
  return (
    <Card>
      <HeaderImage>
        <img
          src={image || `https://source.unsplash.com/random/560x400`}
          alt={altText}
          title={altText}
        />
      </HeaderImage>
      <h2>{title}</h2>
      <time>{date}</time>
      <TagWrapper>
        {tech.map(techItem => (
          <Tag key={techItem} tag={techItem} />
        ))}
      </TagWrapper>
      <Description>{excerpt}</Description>
      <hr />
      <MoreInfoLink to={`/projects/${slug}`}>More Info?</MoreInfoLink>
      <ExternalLinkWrapper>
        <a href={repo} className="left">
          <FaGithub />
          View the Code
        </a>
        <a href={link} className="right">
          <FaLink />
          View it Live
        </a>
      </ExternalLinkWrapper>
    </Card>
  )
}

export default ProjectCard
