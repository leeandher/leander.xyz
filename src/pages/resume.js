import React from "react"
import styled from "styled-components"

import BusinessCard from "../components/BusinessCard"
import Page from "../components/Page"
import { Default } from "../components/PageSections"

import { themer } from "../styles/helpers"

const Header = styled.div`
  padding-top: 100px;
`

const MeCard = styled(BusinessCard)`
  margin: 0 auto;
`

const ResumeSection = styled(Default)`
  background: ${themer("accent")};
`

const Resume = () => {
  return (
    <Page accent="blue" design="space" seoProfile="resume-page">
      <Header>
        <MeCard />
      </Header>
      <ResumeSection>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          consequuntur, ipsum, qui aliquam quo nulla, quibusdam eum sapiente
          esse ducimus cupiditate eaque? Fugiat, sit ratione aspernatur, facilis
          natus voluptatibus nesciunt harum temporibus quos accusamus minus quis
          magnam earum ab neque quasi? Quam, rem. Ad accusantium officia
          cupiditate placeat aperiam illum aspernatur iusto, veniam error
          deserunt assumenda animi, provident aut dolore. Odio consectetur quia,
          ipsum obcaecati mollitia excepturi dignissimos quae deleniti,
          voluptatum officia cupiditate molestiae neque quasi delectus laborum
          at perspiciatis adipisci ex quas accusamus ad laboriosam. Eius
          reiciendis dicta ipsam, temporibus ducimus voluptatum ut dolores non
          blanditiis magni doloribus unde.
        </p>
      </ResumeSection>
    </Page>
  )
}

export default Resume
