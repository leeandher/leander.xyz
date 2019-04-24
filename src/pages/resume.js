import React, { useState, useEffect } from "react"
import styled from "styled-components"

import BusinessCard from "../components/BusinessCard"
import Page from "../components/Page"

import seoDescriptions from "../data/seo-descriptions.json"

const ExpanderWrapper = styled.div`
  background: ${({ theme }) => theme.shade.lightest};
  display: flex;
  overflow: hidden;
  h2 {
    ${({ theme }) => theme.transition.default("all")};
    margin: 0 auto;
    max-width: 960px;
    font-size: 3rem;
    padding: 1.5rem;
    flex: 1;
    word-spacing: 1000px;
  }
  .content {
    transition: 1s linear all;
    width: 90%;
    flex: 9;
  }
`

const Expander = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <ExpanderWrapper onClick={() => setExpanded(!expanded)} expanded={expanded}>
      <h2>{title}</h2>
      {children}
    </ExpanderWrapper>
  )
}

const Wrapper = styled.div`
  display: block;
  padding-top: 100px;
`

const MeCard = styled(BusinessCard)`
  margin: 0 auto;
`

const Resume = () => {
  return (
    <Page
      accent="blue"
      accentBg
      title="Resume - Leander Rodrigues"
      design="space"
      description={seoDescriptions.resume}
    >
      <Wrapper>
        <MeCard />
      </Wrapper>
      {/* <Expander title="Work Experience">
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            consequuntur, ipsum, qui aliquam quo nulla, quibusdam eum sapiente
            esse ducimus cupiditate eaque? Fugiat, sit ratione aspernatur,
            facilis natus voluptatibus nesciunt harum temporibus quos accusamus
            minus quis magnam earum ab neque quasi? Quam, rem. Ad accusantium
            officia cupiditate placeat aperiam illum aspernatur iusto, veniam
            error deserunt assumenda animi, provident aut dolore. Odio
            consectetur quia, ipsum obcaecati mollitia excepturi dignissimos
            quae deleniti, voluptatum officia cupiditate molestiae neque quasi
            delectus laborum at perspiciatis adipisci ex quas accusamus ad
            laboriosam. Eius reiciendis dicta ipsam, temporibus ducimus
            voluptatum ut dolores non blanditiis magni doloribus unde.
          </p>
        </div>
      </Expander> */}
    </Page>
  )
}

export default Resume
