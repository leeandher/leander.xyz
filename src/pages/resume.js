import React from "react"
import styled from "styled-components"

import Page from "../components/Page"
import Hero from "../components/Hero"
import WorkCard from "../components/page-specific/Resume/WorkCard"
import BusinessCard from "../components/BusinessCard"
import { Default } from "../components/PageSections"

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
  margin: 2rem 0;
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

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  margin: 0 auto;
  max-width: calc(${themer("spacing.maxWidth")} + 200px);
  ${media.desktop`
    display: block;
  `}
`

const Scroller = styled.aside`
  color: ${themer("shade.lightest")};
  margin: 2rem 1rem;
  ${media.desktop`
    display: none;
  `}
  .links {
    position: sticky;
    top: ${themer("constants.navBarHeight")};
    padding-top: 1rem;
  }
  .page-link {
    display: block;
    font-size: 1.5rem;
    margin: 1.5rem 1rem;
    margin-left: 2rem;
    padding-left: 0.5rem;
    font-weight: 300;
    position: relative;
    &:before {
      content: "# ";
      position: absolute;
      right: 100%;
      font-weight: bold;
      top: 0;
      color: ${themer("accent")};
    }
    &:hover {
      text-decoration: underline ${themer("accent")};
    }
  }
`
const Resume = () => {
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
            <a className="page-link" href="#education">
              Education
            </a>
            <a className="page-link" href="#work-experience">
              Work Experience
            </a>
            <a className="page-link" href="#project-showcase">
              Project Showcase
            </a>
            <a className="page-link" href="#volunteer-experience">
              Voluneer Experience
            </a>
            <a className="page-link" href="#achievements">
              Acheivements
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
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="character-sheet">
              Character Sheet
            </h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="education">
              Education
            </h2>
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
            <h2 className="title" id="project-showcase">
              Project Showcase
            </h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="volunteer-experience">
              Volunteer Experience
            </h2>
          </ResumeLayout>

          <ResumeLayout>
            <h2 className="title" id="achievements">
              Achievements
            </h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="interests">
              Interests
            </h2>
          </ResumeLayout>
        </ResumeSection>
      </PageWrapper>
    </Page>
  )
}

export default Resume
