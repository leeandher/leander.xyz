import React, { useEffect, useRef } from "react"
import styled from "styled-components"

const ProgressBar = styled.div`
  position: fixed;
  z-index: 1000;
  display: block;
  background: ${({ theme }) => theme.accent};
  width: 100%;
  max-width: 0%;
  height: 0.5rem;
  top: ${({ theme }) => theme.constants.navBarHeight};
  @media (max-width: 850px) {
    top: 0;
  }
  &:before {
    ${({ theme }) => theme.before}
    background: linear-gradient(to right, transparent, 85%, ${({ theme }) =>
      theme.shade.lightest})
  }
`

const ScrollProgress = props => {
  const progressRef = useRef(null)
  const handleScroll = e => {
    const currentScroll = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    )
    const maxScroll = e.srcElement.body.scrollHeight - window.innerHeight
    if (progressRef)
      progressRef.current.style.maxWidth = `${(currentScroll / maxScroll) *
        100}%`
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })
  return <ProgressBar ref={progressRef} {...props} />
}

export default ScrollProgress
