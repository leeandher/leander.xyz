import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Button from "../components/Button.js"
import Hero from "../components/Hero.js"
import Page from "../components/Page.js"
import QuoteCard from "../components/QuoteCard.js"

import Typer from "../components/page-specific/Home/Typer.js"

const StyledSection = styled.section`
  /* background: ${{ background }}; */
  position: relative;
  /* overflow: hidden; */
  h2 {
    font-size: 3.5rem;
    text-align: center;
    text-decoration: underline ${({ theme }) => theme.accent};
  }
  div {
    margin: 0 auto;
    max-width: ${({ theme }) => theme.spacing.mw};
    padding: 0 2rem;
  }
`

const TrpSection = styled(StyledSection)`
  padding: 10rem 0 5rem 0;
  margin: 10rem 0;
  z-index: 0;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: skewY(4deg);
    transform-origin: top left;
    background: ${({ theme }) => theme.shade.lightest};
  }
`

const PanelWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 1250px;
  margin: 0 auto;
`

const Home = () => {
  return (
    <Page
      accent="teal"
      accentBg
      title="Welcome to leander.xyz!"
      design="mesh"
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
      <TrpSection>
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
      </TrpSection>
      {/* <br />
      <StyledSection>
        <h2>"So, what do you do again?"</h2>
        <h3>Well I guess that depends on what you'd like to see?</h3>
        <PanelWrapper>
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
      </StyledSection> */}
    </Page>
  )
}

export default Home
