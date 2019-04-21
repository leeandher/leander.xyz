import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Button from "../components/Button"
import Hero from "../components/Hero"
import Page from "../components/Page"
import QuoteCard from "../components/QuoteCard"
import MainWrapper from "../components/MainWrapper"
import ShowItem from "../components/ShowItem"
import { Default, Skewed } from "../components/PageSections"
import Typer from "../components/page-specific/Home/Typer"

import seoDescriptions from "../data/seo-descriptions.json"

const MainHero = styled(Hero)`
  margin-top: -${({ theme }) => theme.constants.navBarHeight};
`

const Introduction = styled(Skewed)`
  padding: 10rem 0 3rem 0;
  margin: 10rem 0;
  &:before {
    background: ${({ theme }) => theme.shade.lightest};
  }
  button {
    display: block;
    margin: 1rem auto;
    margin-top: 4rem;
  }
`

const Director = styled(Default)`
  color: ${({ theme }) => theme.shade.lightest};
  padding-top: 2rem;
`

const PanelWrapper = styled(MainWrapper)`
  display: flex;
  flex-flow: row wrap;
`

const Showcase = styled(Skewed)`
  padding: 3rem 0 15rem;
  margin: 15rem 0;
  &:before {
    background: ${({ theme }) => theme.shade.lightest};
  }
`
const Carousel = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding: 3rem 2rem 5rem;
  border-radius: 2rem;
  margin: 2rem;
  &::-webkit-scrollbar {
    height: 1.25rem;
    border: 2px solid ${({ theme }) => theme.accent};
    border-radius: 1.25rem;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.accent};
    padding: -0.5rem !important;
    width: 10px;
    border-radius: 1.25rem;
  }
`

const Home = () => {
  return (
    <Page
      accent="teal"
      accentBg
      design="space"
      title="Leander Rodrigues: Toronto Developer | Web Nerd | Dog Fanatic"
      description={seoDescriptions.home}
    >
      <MainHero>
        <p>Hi there, My name is</p>
        <h1>
          <span>Leander Rodrigues</span>
        </h1>
        <p>and I'd probably describe myself as</p>
        <h2>
          <Typer />
        </h2>
      </MainHero>
      <Introduction skew="4deg">
        <MainWrapper>
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
        </MainWrapper>
      </Introduction>
      <Director>
        <h2>"So, what do you do again?"</h2>
        <h3>
          Well I guess that depends,
          <br />
          what would you like to see?
        </h3>
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
      </Director>
      <Showcase skew="-4deg">
        <h2>"Help me, I can't decide!"</h2>
        <h3>
          I've picked a few goodies out,
          <br />
          maybe you'll like one?
        </h3>
        <Carousel>
          <ShowItem
            src="https://source.unsplash.com/random/340x640"
            title="Fake Project"
            description="Some description about the project that isn't too long or anything"
          />
          <ShowItem
            src="https://source.unsplash.com/random/340x640"
            title="Fake Project"
            description="Some description about the project that isn't too long or anything"
          />
          <ShowItem
            src="https://source.unsplash.com/random/340x640"
            title="Fake Project"
            description="Some description about the project that isn't too long or anything"
          />
          <ShowItem
            src="https://source.unsplash.com/random/340x640"
            title="Fake Project"
            description="Some description about the project that isn't too long or anything"
          />
          <ShowItem
            src="https://source.unsplash.com/random/340x640"
            title="Fake Project"
            description="Some description about the project that isn't too long or anything"
          />
          <ShowItem
            src="https://source.unsplash.com/random/340x640"
            title="Fake Project"
            description="Some description about the project that isn't too long or anything"
          />
          <ShowItem
            src="https://source.unsplash.com/random/340x640"
            title="Fake Project"
            description="Some description about the project that isn't too long or anything"
          />
        </Carousel>
      </Showcase>
    </Page>
  )
}

export default Home
