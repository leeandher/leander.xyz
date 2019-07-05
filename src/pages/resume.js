import React from "react"
import styled from "styled-components"
import marked from "marked"
import { graphql } from "gatsby"

import Page from "../components/Page"
import Hero from "../components/Hero"
import Carousel from "../components/Carousel"
import ShowItem from "../components/ShowItem"
import { Default } from "../components/PageSections"

import BusinessCard from "../components/page-specific/Resume/BusinessCard"
import GenCard from "../components/page-specific/Resume/GenCard"
import GenText from "../components/page-specific/Resume/GenText"
import WorkCard from "../components/page-specific/Resume/WorkCard"
import Scroller from "../components/page-specific/Resume/Scroller"
import CharacterSheetWrapper from "../components/page-specific/Resume/CharacterSheetWrapper"
import EmojiBullet from "../components/page-specific/Resume/EmojiBullet"

import resume from "../data/resume.json"

import { media, themer } from "../styles/helpers"

const Header = styled.div`
  padding-top: 100px;
  margin-bottom: 5rem;
`

const MeCard = styled(BusinessCard)`
  margin: 0 auto;
  ${media.phone`
    display: none;
  `}
`
const SmallTitle = styled(Hero).attrs({
  height: "200px",
})`
  display: none;
  ${media.phone`
    display: block;
  `}
`

const ResumeSection = styled(Default)`
  margin: 1.5rem 0;
`

const ResumeLayout = styled.div`
  display: grid;
  background: ${themer("shade.lightest")};
  border-radius: 2rem;
  grid-template-columns: 250px auto;
  max-width: ${themer("spacing.maxWidth")};
  margin: 2rem auto;
  ${media.tablet`
    display: block;
    margin: 0;
  `}
  .title {
    padding: ${themer("constants.navBarHeight")} 2.5rem;
    grid-area: 1 / 1 / 1 / 1;
    border-right: 2px solid ${themer("accent")};
    text-align: right;
    font-weight: 300;
    ${media.tablet`
      border: 0;
      text-align: center;
      padding: 2rem;
      margin-bottom: 0;
      font-size: 3rem;
    `}
  }
  .content {
    padding: ${themer("constants.navBarHeight")} 2.5rem;
    grid-area: 1 / 2 / 1 / 2;
    font-size: 1.5rem;
    text-align: left;
    ${media.tablet`
      padding: 1rem;
    `}
  }
`

const SOQWrapper = styled.div`
  padding: 1rem;
  margin: 2rem;
  .soq-bullet {
    font-size: 1.75rem;
  }
`

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  margin: 0 auto;
  max-width: calc(${themer("spacing.maxWidth")} + 200px);
  ${media.desktop`
    display: block;
  `}
`

const Resume = ({ data }) => {
  const { allMarkdownRemark } = data
  const { nodes: showcaseItems } = allMarkdownRemark
  return (
    <Page accent="blue" bgDesign="space" seoProfile="resume-page">
      <Header>
        <MeCard />
        <SmallTitle>
          <h1 className="title">Resume</h1>
        </SmallTitle>
      </Header>
      <PageWrapper>
        <Scroller>
          <div className="links">
            <a className="page-link" href="#summary-of-qualifications">
              Summary of Qualifications
            </a>
            <a className="page-link" href="#character-sheet">
              Character Sheet
            </a>
            <a className="page-link" href="#work-experience">
              Work Experience
            </a>
            <a className="page-link" href="#education">
              Education
            </a>
            <a className="page-link" href="#project-showcase">
              Project Showcase
            </a>
            <a className="page-link" href="#volunteer-experience">
              Volunteer Experience
            </a>
            <a className="page-link" href="#achievements">
              Achievements
            </a>
            <a className="page-link" href="#interests">
              Interests
            </a>
          </div>
        </Scroller>
        <ResumeSection>
          <ResumeLayout>
            <h2 className="title" id="summary-of-qualifications">
              Summary of Qualifications
            </h2>
            <SOQWrapper className="content">
              {resume["summary-of-qualifications"].map(({ emoji, text }, i) => (
                <EmojiBullet emoji={emoji} className="soq-bullet" key={i}>
                  {text}
                </EmojiBullet>
              ))}
            </SOQWrapper>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="character-sheet">
              Character Sheet
            </h2>
            <div className="content">
              <CharacterSheetWrapper
                characterSheetData={resume["character-sheet"]}
              />
            </div>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="work-experience">
              Work Experience
            </h2>
            <div className="content">
              {resume["work-experience"].map((jobInfo, i) => (
                <WorkCard key={i} {...jobInfo} />
              ))}
            </div>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="education">
              Education
            </h2>
            <div className="content">
              {resume.education.map((educationInfo, i) => (
                <GenCard key={i} {...educationInfo} />
              ))}
            </div>
          </ResumeLayout>

          <ResumeLayout>
            <h2 className="title" id="project-showcase">
              Project Showcase
            </h2>
            <Carousel>
              {showcaseItems.map(
                ({ frontmatter: { slug, ...showItemProps } }, i) => {
                  const showCaseLink = `/projects/${slug}`
                  return (
                    <ShowItem key={i} to={showCaseLink} {...showItemProps} />
                  )
                }
              )}
            </Carousel>
          </ResumeLayout>

          <ResumeLayout>
            <h2 className="title" id="volunteer-experience">
              Volunteer Experience
            </h2>
            <div className="content">
              {resume["volunteer-work"].map((educationInfo, i) => (
                <GenCard key={i} {...educationInfo} />
              ))}
            </div>
          </ResumeLayout>

          <ResumeLayout>
            <h2 className="title" id="achievements">
              Achievements
            </h2>
            <div className="content">
              {resume.achievements.map((educationInfo, i) => (
                <GenCard key={i} {...educationInfo} />
              ))}
            </div>
          </ResumeLayout>

          <ResumeLayout>
            <h2 className="title" id="weird-stuff">
              Weird Stuff
            </h2>
            <div className="content">
              <GenText>
                {resume["weird-stuff"].map((item, i) => (
                  <EmojiBullet
                    key={i}
                    dangerouslySetInnerHTML={{ __html: marked(item) }}
                  />
                ))}
              </GenText>
            </div>
          </ResumeLayout>
        </ResumeSection>
      </PageWrapper>
    </Page>
  )
}

export default Resume

// TODO : Fix this workaround
export const showcaseQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: { showcase: { eq: true }, type: { eq: "projects" } }
      }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      nodes {
        frontmatter {
          title
          description
          image
          slug
        }
      }
    }
  }
`
