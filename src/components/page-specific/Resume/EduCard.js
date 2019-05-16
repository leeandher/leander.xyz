import React from "react"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const Card = styled.div`
  padding: 2rem 1rem;
  .edu-desc {
    font-size: 1.6rem;
  }
`
const CardHeader = styled.a`
  display: block;
  .edu-title {
    margin: 0;
    font-size: 2.5rem;
    padding: 0.5rem 2rem;
    transform: skew(-12deg);
    &:before {
      ${themer("before")};
      opacity: 0.5;
      background: ${themer("accent")};
    }
  }
  .edu-loc {
    text-decoration: underline ${themer("accent")};
    margin: 1rem;
    display: flex;
    font-family: ${themer("font.mono")};
    justify-content: space-between;
    font-size: 1.75rem;
  }
`

const EduCard = ({ description, link, location, time, title }) => {
  return (
    <Card>
      <CardHeader href={link}>
        <h2 className="edu-title">{title}</h2>
        <h4 className="edu-loc">
          {location}
          <time>{time}</time>
        </h4>
      </CardHeader>
      <p className="edu-desc">{description}</p>
    </Card>
  )
}

export default EduCard
