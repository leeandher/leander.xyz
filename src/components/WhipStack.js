import React, { useState } from "react"
import styled from "styled-components"
import { useSprings, animated, interpolate } from "react-spring"
import { useGesture } from "react-with-gesture"

import ProjectCard from "./page-specific/Projects/ProjectCard"

const NewProjectCard = styled(ProjectCard)`
  will-change: transform;
  box-shadow: 0 12.5px 20px -10px rgba(50, 50, 73, 0.4),
    0 10px 10px -10px rgba(50, 50, 73, 0.3);
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
`

const to = i => ({
  x: 0,
  y: i * -4,
  scale: 0.9,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})
const from = i => ({ x: 0, y: i * -4, rot: 0, scale: 1 })
const trans = (r, s) =>
  `perspective(2000px) rotateX(20deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`

const WhipStack = ({ itemProps }) => {
  const [gone] = useState(() => new Set()) //
  const [springProps, set] = useSprings(itemProps.length, i => ({
    ...to(i),
    from: from(i),
  }))

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2
      const dir = xDir < 0 ? -1 : 1
      if (!down && trigger) gone.add(index)
      set(i => {
        if (index !== i) return
        const isGone = gone.has(index)
        const ifNotGoneX = down ? xDelta : 0
        const x = isGone ? (200 + window.innerWidth) * dir : ifNotGoneX
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0)
        const scale = down ? 1.0 : 0.9
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
