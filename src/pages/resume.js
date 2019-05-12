import React from "react"
import styled from "styled-components"

import BusinessCard from "../components/BusinessCard"
import Page from "../components/Page"
import WorkCard from "../components/page-specific/Resume/WorkCard"
import { Default } from "../components/PageSections"

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
  margin: 2rem 0;
`

const ResumeLayout = styled.div`
  display: grid;
  background: ${themer("shade.lightest")};
  border-radius: 2rem;
  grid-template-columns: 250px auto;
  max-width: ${themer("spacing.maxWidth")};
  margin: 2rem auto;
  .title {
    padding: ${themer("constants.navBarHeight")} 2.5rem;
    grid-area: 1 / 1 / 1 / 1;
    border-right: 2px solid ${themer("accent")};
    text-align: right;
    font-weight: 300;
  }
  .content {
    padding: ${themer("constants.navBarHeight")} 2.5rem;
    grid-area: 1 / 2 / 1 / 2;
    font-size: 1.5rem;
    text-align: left;
  }
`

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  margin: 0 auto;
  max-width: calc(${themer("spacing.maxWidth")} + 200px);
`

const Scroller = styled.aside`
  color: ${themer("shade.lightest")};
  margin: 2rem 1rem;
  .links {
    position: sticky;
    top: ${themer("constants.navBarHeight")};
    margin: 0 auto;
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
      </Header>
      <PageWrapper>
        <Scroller>
          <div className="links">
            <a className="page-link" href="#soq">
              Summary of Qualifications
            </a>
            <a className="page-link" href="#cs">
              Character Sheet
            </a>
            <a className="page-link" href="#edu">
              Education
            </a>
            <a className="page-link" href="#we">
              Work Experience
            </a>
            <a className="page-link" href="#ps">
              Project Showcase
            </a>
            <a className="page-link" href="#ve">
              Voluneer Experience
            </a>
            <a className="page-link" href="#ach">
              Acheivements
            </a>
            <a className="page-link" href="#int">
              Interests
            </a>
          </div>
        </Scroller>
        <ResumeSection>
          <ResumeLayout>
            <h2 className="title" id="soq">
              Summary of Qualifications
            </h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="cs">
              Character Sheet
            </h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="edu">
              Education
            </h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="we">
              Work Experience
            </h2>
            <div className="content">
              {resume["work-experience"].map((jobInfo, i) => (
                <WorkCard key={i} {...jobInfo} />
              ))}
            </div>
          </ResumeLayout>

          <ResumeLayout>
            <h2 className="title" id="ps">
              Project Showcase
            </h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="ve">
              Volunteer Experience
            </h2>
          </ResumeLayout>

          <ResumeLayout>
            <h2 className="title" id="ach">
              Achievements
            </h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title" id="int">
              Interests
            </h2>
          </ResumeLayout>
        </ResumeSection>
      </PageWrapper>
    </Page>
  )
}

export default Resume
