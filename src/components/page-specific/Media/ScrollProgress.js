import React, { useState, useEffect } from "react"
import styled from "styled-components"

const ScrollProgress = props => {
  const ProgressBar = styled.div`
    position: fixed;
    z-index: 1000;
    display: block;
    background: ${({ theme }) => theme.accent};
    width: 100%;
    max-width: ${({ progress }) => progress * 100}%;
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

  const [progress, setProgress] = useState(0)

  const handleScroll = e => {
    const currentScroll = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    )
    const maxScroll = e.srcElement.body.scrollHeight - window.innerHeight
    setProgress(currentScroll / maxScroll)
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })
  return <ProgressBar progress={progress} {...props} />
}

export default ScrollProgress
