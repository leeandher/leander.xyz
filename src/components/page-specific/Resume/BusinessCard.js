import React from "react"
import styled, { keyframes } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa"

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
  min-width: ${themer("spacing.minWidth")};
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
  padding-top: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr repeat(5, auto);
    grid-gap: 1rem 0;
  `}
`
const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 1rem;
  grid-area: 1 / 1 / 5 / 1;
  ${media.phone`
    grid-area: 1 / 1 / 2 / 5;
    max-height: 400px;
  `}
`

const CardHeader = styled.h1`
  display: block;
  grid-area: 1 / 2 / 2 / 6;
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
  text-align: center;
  font-weight: 300;
  font-size: 1.5rem;
  letter-spacing: 1.5px;
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
  grid-area: 3 / 2 / 4 / 4;
  text-align: right;
  justify-self: end;
  ${media.phone`
    grid-area: 4 / 1 / 4 / 3;
  `}
  font-weight: 500;
  font-size: 1.5rem;
  margin: 0.5rem 0.75rem;
  margin-bottom: 0;
`

const CardValues = styled.div`
  padding: 2rem 0;
  grid-area: 3 / 4 / 4 / 6;
  justify-self: start;
  ${media.phone`
    grid-area: 4 / 3 / 4 / 5;
  `}
  font-weight: 300;
  font-size: 1.5rem;
  margin: 0.5rem 0.75rem;
  margin-bottom: 0;
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
  const { pdf } = useStaticQuery(graphql`
    query PROFILE_IMAGE_QUERY {
      pdf: file(extension: { eq: "pdf" }) {
        publicURL
      }
    }
  `)
  const myExp = () => {
    const expInMiliseconds = new Date() - new Date(2021, 7, 9)
    const expInMonths = expInMiliseconds / (1000 * 3600 * 24 * 30) + 16
    const [years, months] = [
      Math.floor(expInMonths / 12),
      Math.round(expInMonths % 12),
    ]
    return `${years} year${years > 1 ? "s" : ""} ${months} month${
      months > 1 ? "s" : ""
    }`
  }
  return (
    <CardWrapper {...props}>
      <CardImage
        src="/assets/profile_pic_mountain.jpg"
        alt="me on a big hill"
      />
      <CardHeader>
        Hi, I'm <span>Leander Rodrigues</span>
      </CardHeader>
      <CardSubtitle>Full-stack Software Engineer</CardSubtitle>
      <CardTitles>
        <p>Work Experience:</p>
        <p>Location:</p>
        <p>Email:</p>
      </CardTitles>
      <CardValues>
        <p>{myExp()}</p>
        <p>Toronto, ON</p>
        <p>me@leander.xyz</p>
      </CardValues>
      <CardAnchorLink order={1} href="https://github.com/leeandher">
        <FaGithub />
      </CardAnchorLink>
      <CardAnchorLink
        order={2}
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
