import React from "react"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const Card = styled.div`
  padding: 2rem 1rem;
  .gen-desc {
    font-size: 1.6rem;
  }
`
const CardHeader = styled.a`
  display: block;
  .gen-title {
    margin: 0;
    font-size: 2.5rem;
    padding: 0.5rem 2rem;
    transform: skew(-12deg);
    &:before {
      ${themer("before")};
      opacity: ${themer("opacity.faded")};
      background: ${themer("accent")};
    }
  }
  .gen-loc {
    text-decoration: underline ${themer("accent")};
    margin: 1rem;
    display: flex;
    font-family: ${themer("font.mono")};
    justify-content: space-between;
    font-size: 1.75rem;
    span {
      padding: 0.5rem;
    }
    time {
      border-left: 2px solid ${themer("accent")};
      padding: 0.5rem;
    }
  }
`

const GenCard = ({ description, link, location, time, title }) => {
  return (
    <Card>
      <CardHeader href={link}>
        <h2 className="gen-title">{title}</h2>
        <h4 className="gen-loc">
          <span>{location}</span>
          <time>{time}</time>
        </h4>
      </CardHeader>
      <p className="gen-desc">{description}</p>
    </Card>
  )
}

export default GenCard
