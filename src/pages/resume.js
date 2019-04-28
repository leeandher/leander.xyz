import React from "react"
import styled from "styled-components"

import BusinessCard from "../components/BusinessCard"
import Page from "../components/Page"
import WorkCard from "../components/page-specific/Resume/WorkCard"
import { Default } from "../components/PageSections"

import resume from "../data/resume.json"

import { themer } from "../styles/helpers"

const Header = styled.div`
  padding-top: 100px;
`

const MeCard = styled(BusinessCard)`
  margin: 0 auto;
`

const ResumeSection = styled(Default)`
  background: ${themer("shade.lightest")};
  margin: 2rem 0;
`

const ResumeLayout = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  max-width: ${themer("spacing.maxWidth")};
  margin: 0 auto;
  .title {
    padding: 2.5rem;
    grid-area: 1 / 1 / 1 / 1;
    border-right: 2px solid ${themer("accent")};
    text-align: right;
    font-weight: 300;
  }
  .content {
    padding: 2.5rem;
    grid-area: 1 / 2 / 1 / 2;
    font-size: 1.5rem;
    text-align: left;
  }
`

const Resume = () => {
  return (
    <Page accent="blue" bgDesign="space" seoProfile="resume-page">
      <Header>
        <MeCard />
      </Header>
      <h2>Woot</h2>
      <ResumeSection>
        <ResumeLayout>
          <h2 className="title">Work Experience</h2>
          <div className="content">
            {resume["work-experience"].map(jobInfo => (
              <WorkCard {...jobInfo} />
            ))}
          </div>
        </ResumeLayout>
      </ResumeSection>
    </Page>
  )
}

export default Resume
