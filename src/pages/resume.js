import React from "react"
import styled from "styled-components"
import marked from "marked"
import { graphql } from "gatsby"

import Page from "../components/Page"
import Carousel from "../components/Carousel"
import ShowItem from "../components/ShowItem"
import { Default } from "../components/PageSections"

import BusinessCard from "../components/page-specific/Resume/BusinessCard"
import GenCard from "../components/page-specific/Resume/GenCard"
import GenText from "../components/page-specific/Resume/GenText"
import WorkCard from "../components/page-specific/Resume/WorkCard"
import Scroller from "../components/page-specific/Resume/Scroller"
import EmojiBullet from "../components/page-specific/Resume/EmojiBullet"

import resume from "../data/resume.json"

import { media, themer } from "../styles/helpers"

const Header = styled.div`
  padding-top: 100px;
  margin-bottom: 5rem;
`

const MeCard = styled(BusinessCard)`
  margin: 0 auto;
`

const ResumeSection = styled(Default)`
  margin: 1.5rem 0;
`

const ResumeLayout = styled.div`
  display: grid;
  background: ${themer("shade.lightest")};
  grid-template-columns: 275px 1fr;
  max-width: ${themer("spacing.maxWidth")};
  min-width: ${themer("spacing.minWidth")};
  border-radius: 0.5rem;
  margin: 2rem 0.75rem;
  padding: 0.5rem 0;
  position: relative;
  &:after {
    ${themer("before")};
    background: ${themer("accent")};
    top: -0.75rem;
    border-radius: 0.5rem;
    left: -0.75rem;
  }
  ${media.tablet`
    display: block;
  `}
  ${media.desktop`
    margin: 2rem 1.5rem;
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
    ${media.tablet`
      padding: 2.5rem;
    `}
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
    <Page accentKey="blue" bgDesign="space" seoProfile="resume-page">
      <Header>
        <MeCard />
      </Header>
      <PageWrapper>
        <Scroller>
          <div className="links">
            <a className="page-link" href="#summary-of-qualifications">
              Summary of Qualifications
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
            <h2 className="title" id="interests">
              Interests
            </h2>
            <div className="content">
              <GenText>
                {resume.interests.map((item, i) => (
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

export const showcaseQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: { showcase: { eq: true }, type: { eq: "projects" } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
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
