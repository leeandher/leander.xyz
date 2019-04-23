import React, { useState, useEffect } from "react"
import styled from "styled-components"

import {
  FaGithub,
  FaStackOverflow,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa"
import Page from "../components/Page"
import Hero from "../components/Hero"

import seoDescriptions from "../data/seo-descriptions.json"

const ExpanderWrapper = styled.div`
  background: ${({ theme }) => theme.shade.lightest};
  display: flex;
  overflow: hidden;
  h2 {
    ${({ theme }) => theme.transition.default("all")};
    margin: 0 auto;
    max-width: 960px;
    font-size: 3rem;
    padding: 1.5rem;
    flex: 1;
    word-spacing: 1000px;
  }
  .content {
    transition: 1s linear all;
    width: 90%;
    flex: 9;
  }
`

const Expander = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <ExpanderWrapper onClick={() => setExpanded(!expanded)} expanded={expanded}>
      <h2>{title}</h2>
      {children}
    </ExpanderWrapper>
  )
}

const CardWrapper = styled.div`
  margin-top: 200px;

  background: ${({ theme }) => theme.shade.lightest};
  position: relative;
  &:active {
    box-shadow: 0;
  }
  &:before {
    content: "My Business Card";
    background: ${({ theme }) => theme.accent};
    position: absolute;
    padding: 1rem 2rem;
    font-weight: bold;
    transform: rotate(-15deg);
    top: -15px;
    left: -30px;
  }
  max-width: 650px;
  padding: 1.5rem;
  border-radius: 1.5rem;
  display: grid;
  grid-template-columns: 250px repeat(4, 1fr);
  grid-template-rows: 50px 25px 125px 50px;
  justify-items: start;
  align-items: center;
`
const CardImage = styled.img`
  grid-area: 1 / 1 / 6 / 1;
  max-width: 100%;
  height: 100%;
  border-radius: 1rem;
`

const CardHeader = styled.h1`
  display: block;
  grid-area: 1 / 2 / 1 / 6;
  padding-left: 1.5rem;
  margin: 0;
  font-weight: 300;
  font-size: 2.75rem;
  span {
    font-weight: 500;
    text-decoration: underline ${({ theme }) => theme.accent};
  }
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
  border-bottom: 2px solid ${({ theme }) => theme.accent};
  span {
    font-weight: 500;
    text-decoration: underline ${({ theme }) => theme.accent};
  }
`

const CardTitles = styled.div`
  padding-left: 3rem;
  grid-area: 3 / 2 / 3 / 3;
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
  justify-self: center;
  color: ${({ theme }) => theme.accent};
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
    color: ${({ theme }) => theme.shade.lightest};
    background: ${({ theme }) => theme.accent};
  }
`

const MeCard = () => {
  return (
    <CardWrapper>
      <CardImage src="https://source.unsplash.com/random/400x400" />
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
        <p>20 years old</p>
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
      <CardAnchorLink order={4} href="https://twitter.com/LeeAndHer">
        <FaTwitter />
      </CardAnchorLink>
    </CardWrapper>
  )
}

const Resume = () => {
  return (
    <Page
      accent="blue"
      accentBg
      title="Resume - Leander Rodrigues"
      design="space"
      description={seoDescriptions.resume}
    >
      <MeCard />
      {/* <Expander title="Work Experience">
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            consequuntur, ipsum, qui aliquam quo nulla, quibusdam eum sapiente
            esse ducimus cupiditate eaque? Fugiat, sit ratione aspernatur,
            facilis natus voluptatibus nesciunt harum temporibus quos accusamus
            minus quis magnam earum ab neque quasi? Quam, rem. Ad accusantium
            officia cupiditate placeat aperiam illum aspernatur iusto, veniam
            error deserunt assumenda animi, provident aut dolore. Odio
            consectetur quia, ipsum obcaecati mollitia excepturi dignissimos
            quae deleniti, voluptatum officia cupiditate molestiae neque quasi
            delectus laborum at perspiciatis adipisci ex quas accusamus ad
            laboriosam. Eius reiciendis dicta ipsam, temporibus ducimus
            voluptatum ut dolores non blanditiis magni doloribus unde.
          </p>
        </div>
      </Expander> */}
    </Page>
  )
}

export default Resume
