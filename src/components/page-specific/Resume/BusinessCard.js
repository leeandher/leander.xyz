import React from "react"
import styled, { keyframes } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import {
  FaGithub,
  FaStackOverflow,
  FaLinkedin,
  FaFileAlt,
} from "react-icons/fa"

import { media, themer } from "../../../styles/helpers"

const wavey = keyframes`
  0%{ transform: rotate(-10deg); }
  100%{ transform: rotate(10deg); }
`

const CardWrapper = styled.div`
  background: ${themer("shade.lightest")};
  position: relative;
  &:active {
    box-shadow: 0;
  }
  &:before {
    content: "Download PDF";
    font-size: 1.5rem;
    background: ${themer("accent")};
    position: absolute;
    padding: 0.35rem 0.75rem;
    font-weight: 500;
    z-index: 2;
    transform: rotate(-15deg);
    bottom: -15px;
    right: 0;
    animation: ${wavey} infinite alternate-reverse 1s
      cubic-bezier(0.455, 0.03, 0.515, 0.955);
    ${media.phone`
      right: 1rem;
    `}
  }
  max-width: 650px;
  padding: 1.5rem;
  border-radius: 1.5rem;
  display: grid;
  grid-template-columns: 250px repeat(4, 1fr);
  grid-template-rows: 50px 25px 125px 50px;
  justify-items: center;
  align-items: center;
  ${media.tablet`
    transform: scale(0.8);
  `}
  ${media.phone`
    grid-template-columns: auto auto auto auto;
    grid-template-rows: 250px repeat(5, auto);
  `}
`
const CardImage = styled(Img)`
  max-width: 100%;
  height: 100%;
  border-radius: 1rem;
  grid-area: 1 / 1 / 6 / 1;
  ${media.phone`
    grid-area: 1 / 1 / 1 / 5;
  `}
`

const CardHeader = styled.h1`
  display: block;
  grid-area: 1 / 2 / 1 / 6;
  padding-left: 1.5rem;
  margin: 0;
  font-weight: 300;
  font-size: 2.75rem;
  white-space: nowrap;
  span {
    font-weight: 500;
    text-decoration: underline ${themer("accent")};
  }
  ${media.tablet`
  font-size: 2.25rem;
  `}
  ${media.phone`
    grid-area: 2 / 1 / 2 / 5;
    padding: 0;
  `}
`

const CardSubtitle = styled.h2`
  display: block;
  grid-area: 2 / 2 / 2 / 6;
  margin: 0;
  margin-left: 1.5rem;
  font-weight: 300;
  font-size: 1.5rem;
  letter-spacing: 2px;
  width: calc(100% - 1.5rem);
  height: 100%;
  border-bottom: 2px solid ${themer("accent")};
  span {
    font-weight: 500;
    text-decoration: underline ${themer("accent")};
  }
  ${media.phone`
    grid-area: 3 / 1 / 3 / 5;
    text-align: center;
    margin: 0;
  `}
`

const CardTitles = styled.div`
  padding-left: 3rem;
  grid-area: 3 / 2 / 3 / 3;
  ${media.phone`
    grid-area: 4 / 1 / 4 / 3;
    text-align: right;
    width: 100%;
    margin-top: 1.5rem;
    padding-left: 0;
  `}
  font-weight: 500;
  font-size: 1.5rem;
  p {
    margin: 0;
    margin-bottom: 0.75rem;
  }
`

const CardValues = styled.div`
  padding-left: 4rem;
  grid-area: 3 / 3 / 3 / 6;
  ${media.phone`
    grid-area: 4 / 3 / 4 / 5;
    text-align: left;
    width: 100%;
    padding-left: 2rem;
    margin-top: 1.5rem;
  `}
  font-weight: 300;
  font-size: 1.5rem;
  p {
    margin: 0;
    margin-bottom: 0.75rem;
  }
`

const CardAnchorLink = styled.a`
  display: block;
  grid-area: 4 / ${({ order }) => order + 1} / 5 / ${({ order }) => order + 1};
  ${media.phone`
    grid-area: 5 / ${({ order }) => order} / 6 / ${({ order }) => order};
  `}
  justify-self: center;
  color: ${themer("accent")};
  border-radius: 100%;
  line-height: 0;
  font-size: 2.5rem;
  ${({ theme }) => theme.transition.default("background")};
  svg {
    margin: 1rem;
  }
  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
    color: ${themer("shade.lightest")};
    background: ${themer("accent")};
  }
`

const BusinessCard = props => {
  const { pdf, image } = useStaticQuery(graphql`
    query PROFILE_IMAGE_QUERY {
      pdf: file(extension: { eq: "pdf" }) {
        publicURL
      }
      image: file(relativePath: { eq: "profile_pic.jpg" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const myAge = () => {
    const d = new Date()
    if (d.getMonth() > 9) return d.getFullYear() - 1998
    if (d.getMonth() === 9 && d.getDate() >= 27) return d.getFullYear() - 1998
    return d.getFullYear() - 1999
  }
  return (
    <CardWrapper {...props}>
      <CardImage fixed={image.childImageSharp.fixed} />
      <CardHeader>
        Hi, I'm <span>Leander Rodrigues</span>
      </CardHeader>
      <CardSubtitle>Full-stack Web Developer</CardSubtitle>
      <CardTitles>
        <p>Age</p>
        <p>Location</p>
        <p>Email</p>
      </CardTitles>
      <CardValues>
        <p>{myAge()} years old</p>
        <p>Toronto, ON</p>
        <p>me@leander.xyz</p>
      </CardValues>
      <CardAnchorLink order={1} href="https://github.com/leeandher">
        <FaGithub />
      </CardAnchorLink>
      <CardAnchorLink
        order={2}
        href="https://stackoverflow.com/users/story/10996907?view=Timeline"
      >
        <FaStackOverflow />
      </CardAnchorLink>
      <CardAnchorLink
        order={3}
        href="https://www.linkedin.com/in/leander-rodrigues/"
      >
        <FaLinkedin />
      </CardAnchorLink>
      <CardAnchorLink order={4} href={pdf.publicURL}>
        <FaFileAlt />
      </CardAnchorLink>
    </CardWrapper>
  )
}

export default BusinessCard
