import React from "react"
import styled from "styled-components"

import { media, themer } from "../../../styles/helpers"

const Card = styled.div`
  padding: 3rem 2rem;
  margin: 2rem 0;
`
const CardHeader = styled.a`
  display: block;
  h3 {
    text-align: left;
    margin: 0;
    font-weight: 500;
  }
  .wrap {
    display: flex;
    * {
      font-size: 1.75rem;
    }
  }
  h4 {
    flex: 1;
    font-weight: 300;
    margin: 0;
    padding: 1rem 0.5rem;
    white-space: nowrap;
    border: 0px solid ${themer("accent")};
    border-bottom-width: 5px;
    span {
      font-weight: 300;
      padding: 0.5rem 1rem;
      position: relative;
      z-index: 1;
      ${media.phone`
        display: block;
      `}
      &:before {
        ${themer("before")};
        background: ${themer("accent")};
        opacity: ${themer("opacity.faded")};
        transform: skew(-12deg);
      }
    }
  }
  time {
    flex: 1;
    text-align: right;
    font-weight: 300;
    font-style: italic;
    white-space: nowrap;
    padding: 1rem 0.5rem;
    padding-right: 1.5rem;
    border: 0px solid ${themer("accent")};
    border-width: 0 10px 5px 0;
    ${media.phone`
      border-width: 0 0 5px 0;
    `}
  }
`
const CardContent = styled.ul`
  display: block;
`

const CardListItem = styled.li`
  list-style: none;
  margin: 1rem 0;
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
  font-family: ${themer("font.mono")};
  font-weight: bold;
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

const WorkCard = ({
  bullets,
  company,
  link,
  location,
  time,
  title,
  skills,
}) => {
  return (
    <Card>
      <CardHeader href={link} target="_blank">
        <h3>{title}</h3>
        <div className="wrap">
          <h4>
            <span>{company}</span> - {location}
          </h4>
          <time>{time}</time>
        </div>
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
