import React from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"

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

const ResumeLayout = styled(animated.div)`
  display: grid;
  background: ${themer("shade.lightest")};
  border-radius: 2rem;
  grid-template-columns: 250px auto;
  max-width: ${themer("spacing.maxWidth")};
  margin: 2rem auto;
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

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
`

const Scroller = styled.aside`
  position: sticky;
  color: ${themer("shade.lightest")};
  top: ${themer("constants.navBarHeight")};
  button {
    padding: 2rem;
  }
`
const Resume = () => {
  const [y, setY] = useSpring(() => ({
    y: window.scrollY,
    onFrame: props => window.scroll(0, props.y),
  }))
  return (
    <Page accent="blue" bgDesign="space" seoProfile="resume-page">
      <Header>
        <MeCard />
      </Header>
      <PageWrapper>
        <div>
          <Scroller>
            <h2>BOOYA</h2>
            <animated.button
              type="button"
              onClick={() =>
                setY({
                  from: { y: 100 },
                  to: { y: window.scrollY },
                  onStart: () => console.log("test"),
                })
              }
            >
              {y.y}
            </animated.button>
          </Scroller>
        </div>
        <ResumeSection>
          <ResumeLayout>
            <h2 className="title">Summary of Qualifications</h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title">Character Sheet</h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title">Education</h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title">Work Experience</h2>
            <div className="content">
              {resume["work-experience"].map((jobInfo, i) => (
                <WorkCard key={i} {...jobInfo} />
              ))}
            </div>
          </ResumeLayout>

          <ResumeLayout>
            <h2 className="title">Project Showcase</h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title">Volunteer Experience</h2>
          </ResumeLayout>

          <ResumeLayout>
            <h2 className="title">Achievements</h2>
          </ResumeLayout>
          <ResumeLayout>
            <h2 className="title">Interests</h2>
          </ResumeLayout>
        </ResumeSection>
      </PageWrapper>
    </Page>
  )
}

export default Resume
