import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Button from "../components/Button"
import Hero from "../components/Hero"
import Page from "../components/Page"
import QuoteCard from "../components/QuoteCard"
import MainWrapper from "../components/MainWrapper"

import { Default, Skewed } from "../components/PageSections"

import Typer from "../components/page-specific/Home/Typer"

const Introduction = styled(Skewed)`
  padding: 10rem 0 5rem 0;
  margin: 10rem 0;
  &:before {
    background: ${({ theme }) => theme.shade.lightest};
  }
`

const Director = styled(Default)`
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
`

const Showcase = styled(Skewed)`
  padding: 5rem 0 15rem;
  margin: 15rem 0;
  &:before {
    background: ${({ theme }) => theme.shade.lightest};
  }
`
const Carousel = styled.div`
  border: 2px solid red;
`
const ShowItem = styled(Link)`
  color: ${({ theme }) => theme.shade.darker};
  padding: 1.5rem 1rem;
  display: inline-block;
  width: 320px;
  height: 540px;
  margin: 2rem;
  border: 2px solid transparent;
  border-radius: 1.5rem;
  box-sizing: content-box;
  background: linear-gradient(${({ theme }) =>
    theme.shade.lightest} 45%, transparent);
  overflow: hidden;
  position: relative;
  box-shadow: 0 1.5rem 1.5rem  ${({ theme }) => theme.shade.lighter};
  text-align: center;
  ${({ theme }) => theme.transition.default("transform, border")};
  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.accent};
  }
  h4 {
    margin: 0;
    display: inline;
    margin: 1.5rem;
    position: relative;
    transform: skewX(-4deg);
    font-weight: 500;
    span {
      padding: 0.5rem 1rem; 
      background: ${({ theme }) => theme.accent};
    }
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
    }
  }
  p {
    font-weight: 300;
    margin: 0;
  } 
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 75%;
  }
  &:before {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background: url("${({ src }) => src}") transparent;
    background-size: cover;
  }
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
        <Carousel>
          <ShowItem
            src="https://source.unsplash.com/random/320x640"
            alt="Unsplashyboi"
          >
            <div>
              <h4>
                <span>Fake Project</span>
              </h4>
              <p>
                Some description about the project that isn't too long or
                anything
              </p>
            </div>
          </ShowItem>
          <ShowItem
            src="https://source.unsplash.com/random/320x640"
            alt="Unsplashyboi"
          >
            <div>
              <h4>
                <span>Fake Project</span>
              </h4>
              <p>
                Some description about the project that isn't too long or
                anything
              </p>
            </div>
          </ShowItem>
          <ShowItem
            src="https://source.unsplash.com/random/320x640"
            alt="Unsplashyboi"
          >
            <div>
              <h4>
                <span>Fake Project</span>
              </h4>
              <p>
                Some description about the project that isn't too long or
                anything
              </p>
            </div>
          </ShowItem>
          <ShowItem
            src="https://source.unsplash.com/random/320x640"
            alt="Unsplashyboi"
          >
            <div>
              <h4>
                <span>Fake Project</span>
              </h4>
              <p>
                Some description about the project that isn't too long or
                anything
              </p>
            </div>
          </ShowItem>
          <ShowItem
            src="https://source.unsplash.com/random/320x640"
            alt="Unsplashyboi"
          >
            <div>
              <h4>
                <span>Fake Project</span>
              </h4>
              <p>
                Some description about the project that isn't too long or
                anything
              </p>
            </div>
          </ShowItem>
          <ShowItem
            src="https://source.unsplash.com/random/320x640"
            alt="Unsplashyboi"
          >
            <div>
              <h4>
                <span>Fake Project</span>
              </h4>
              <p>
                Some description about the project that isn't too long or
                anything
              </p>
            </div>
          </ShowItem>
          <ShowItem
            src="https://source.unsplash.com/random/320x640"
            alt="Unsplashyboi"
          >
            <div>
              <h4>
                <span>Fake Project</span>
              </h4>
              <p>
                Some description about the project that isn't too long or
                anything
              </p>
            </div>
          </ShowItem>
          <ShowItem
            src="https://source.unsplash.com/random/320x640"
            alt="Unsplashyboi"
          >
            <div>
              <h4>
                <span>Fake Project</span>
              </h4>
              <p>
                Some description about the project that isn't too long or
                anything
              </p>
            </div>
          </ShowItem>
        </Carousel>
      </Showcase>
    </Page>
  )
}

export default Home
