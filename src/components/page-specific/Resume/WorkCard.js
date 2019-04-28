import React from "react"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const Card = styled.div`
  margin: 2rem;
`
const CardHeader = styled.a`
  display: block;
  h3 {
    text-align: left;
    margin: 0;
    font-weight: 600;
  }
  h4 {
    margin: 0;
    font-weight: 300;
    font-size: 1.75rem;
    border: 2px solid ${themer("accent")};
    border-width: 0 10px 5px 0;
    padding: 0.5rem;
  }
  time {
  }
`
const CardContent = styled.ul`
  display: block;
`

const CardListItem = styled.li`
  list-style: none;
  &:before {
    display: inline-block;
    position: absolute;
    margin-left: -3rem;
    color: ${themer("accent")};
    content: "${({ bullet }) => bullet}";
  }
`

const CardFooter = styled.div``

const Skill = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin: 0.5rem;
  border: 2px solid ${themer("accent")};
  position: relative;
  background: transparent;
  z-index: 0;
  font-size: 1.25rem;
  &:before {
    ${themer("before")}
    background: ${themer("accent")};
    opacity: 0;
  }
  &:hover {
    cursor: default;
    &:before {
      opacity: 0.3;
    }
  }
`

const WorkCard = ({ bullets, company, location, time, title, skills, url }) => {
  return (
    <Card>
      <CardHeader href={url}>
        <h3>{title}</h3>
        <h4>
          {company} - {location}
        </h4>
        <time>{time}</time>
      </CardHeader>
      <CardContent>
        {bullets.map((bullet, i) => {
          const isString = typeof bullet === "string"
          return (
            <CardListItem key={i} bullet={!isString ? bullet.emoji : ">"}>
              {isString ? bullet : bullet.text}
            </CardListItem>
          )
        })}
      </CardContent>
      <CardFooter>
        {skills.map((skill, i) => (
          <Skill key={i}>{skill}</Skill>
        ))}
      </CardFooter>
    </Card>
  )
}

export default WorkCard
