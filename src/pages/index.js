import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Button from "../components/Button"
import Hero from "../components/Hero"
import Page from "../components/Page"
import QuoteCard from "../components/QuoteCard"
import MainWrapper from "../components/MainWrapper"

import { PageSection, SkewedPageSection } from "../components/PageSections"

import Typer from "../components/page-specific/Home/Typer"

const Introduction = styled(SkewedPageSection)`
  padding: 10rem 0 5rem 0;
  margin: 10rem 0;
  &:before {
    background: ${({ theme }) => theme.shade.lightest};
  }
`

const Director = styled(PageSection)`
  color: ${({ theme }) => theme.shade.lightest};
  padding-top: 2rem;
  h3 {
    font-weight: 300;
    text-align: center;
  }
`

const PanelWrapper = styled(MainWrapper)`
  display: flex;
  flex-flow: row wrap;
  max-width: 1250px;
`

const Home = () => {
  return (
    <Page
      accent="teal"
      accentBg
      title="Welcome to leander.xyz!"
      description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
    >
      <Hero>
        <p>Hi there, My name is</p>
        <h1>
          <span>Leander Rodrigues</span>
        </h1>
        <p>and I'd probably describe myself as</p>
        <h2>
          <Typer />
        </h2>
      </Hero>
      <Introduction skew="4deg">
        <div>
          <h2>"Who are you again?"</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
            diam malesuada, sagittis lacus id, dapibus est. Sed tristique
            lobortis ante. <mark>Vestibulum</mark>
            justo risus, posuere at semper vitae, sodales a turpis. Vestibulum
            ornare nec nunc non fermentum. Donec convallis egestas libero nec
            porta. Duis tincidunt dui tellus, vel sodales urna aliquet a.
            Pellentesque vestibulum elit mollis nibh cursus scelerisque. Aliquam
            vitae auctor erat. Aliquam tempor elit quis est malesuada
            sollicitudin. In non magna dolor. Pellentesque sollicitudin eu est a
            laoreet. Vestibulum cursus, felis nec mollis facilisis, mi lectus
            varius orci, quis facilisis odio purus vel enim. Nullam eu nulla at
            eros scelerisque sagittis nec id tortor.
          </p>

          <p>
            Vestibulum mattis lacus quam, sed venenatis metus rutrum eu. Integer
            vel cursus lectus, quis sodales sem. Quisque non est vel dui
            consequat suscipit ut at nibh. Vestibulum suscipit posuere
            consequat. Proin tellus purus, malesuada et mauris eu, laoreet
            interdum mi. Aliquam erat volutpat. Duis luctus ipsum nec orci
            volutpat, ac ornare nisl suscipit. Etiam imperdiet vehicula neque,
            sit amet cursus odio gravida eu. Phasellus et neque orci.
            Pellentesque id libero at nisl facilisis molestie. Praesent ac odio
            vitae massa posuere rutrum.
          </p>

          <p>
            Nunc lacinia volutpat aliquam. Cras quis egestas tortor, eu pretium
            est. Donec eu dolor justo. Nunc pellentesque nisl enim. Quisque non
            dapibus lectus. Nunc eget magna leo. Sed et ligula tincidunt,
            vestibulum mi ac, faucibus leo. Suspendisse ut commodo ex.
          </p>
          <Button>
            <Link to="/about">More about me</Link>
          </Button>
        </div>
      </Introduction>
      <Director>
        <h2>"So, what do you do again?"</h2>
        <h3>
          Well I guess that depends,
          <br />
          what would you like to see?
        </h3>
        <PanelWrapper maxWidth="1250px">
          <QuoteCard
            accent="orange"
            preText="Got any"
            mainText="PROJECTS"
            to="/projects"
          />
          <QuoteCard
            accent="yellow"
            preText="Show me some"
            mainText="BLOG POSTS"
            to="/blog"
          />
          <QuoteCard
            accent="green"
            preText="I'd like to read your"
            mainText="NOTES"
            to="/notes"
          />
          <QuoteCard
            accent="blue"
            preText="I want to see"
            mainText="EVERYTHING"
            to="/resume"
          />
        </PanelWrapper>
      </Director>
    </Page>
  )
}

export default Home
