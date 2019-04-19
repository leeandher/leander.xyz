import React, { useState } from "react"
import styled from "styled-components"
import { useSprings, animated, interpolate } from "react-spring"
import { useGesture } from "react-with-gesture"

import ProjectCard from "./page-specific/Projects/ProjectCard"

const NewProjectCard = styled(ProjectCard)`
  will-change: transform;
  box-shadow: 0 12.5px 20px -10px rgba(50, 50, 73, 0.4),
    0 10px 10px -10px rgba(50, 50, 73, 0.3);
  transform: rotate(3deg);
  * {
    user-select: none;
  }
  &:hover {
    cursor: grab;
  }
`

const StackWrap = styled(animated.div)`
  position: absolute;
  will-change: transform;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
const Card = styled(animated.div)`
  background-size: auto 85%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 45vh;
  max-width: 300px;
  height: 85vh;
  max-height: 570px;
  will-change: transform;
  border-radius: 10px;
  box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4),
    0 10px 10px -10px rgba(50, 50, 73, 0.3);
`

const to = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})
const from = i => ({ x: 0, y: i * -4, rot: 0, scale: 1.5, y: -1000 })
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`

const WhipStack = ({ itemProps }) => {
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [springProps, set] = useSprings(itemProps.length, i => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
      if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set(i => {
        if (index !== i) return // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index)
        const ifNotGoneX = down ? xDelta : 0
        const x = isGone ? (200 + window.innerWidth) * dir : ifNotGoneX // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1 // Active cards lift up a bit
        const freeTension = isGone ? 200 : 500
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : freeTension },
        }
      })
      if (!down && gone.size === itemProps.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600)
    }
  )
  return springProps.map(({ x, y, rot, scale }, i) => {
    return (
      <StackWrap
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (xPos, yPos) => `translate3d(${xPos}px,${yPos}px,0)`
          ),
        }}
      >
        {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
        <NewProjectCard
          {...bind(i)}
          {...itemProps[i]}
          style={{
            transform: interpolate([rot, scale], trans),
          }}
        />
      </StackWrap>
    )
  })
}

export default WhipStack
