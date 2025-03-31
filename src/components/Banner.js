import React from "react"
import styled from "styled-components"
import { themer } from "../styles/helpers"

export function Banner() {
  return (
    <BannerContainer>
      So, a bunch of things are outdated and broken. I'm working on a rewrite,
      coming out... eventually :]
    </BannerContainer>
  )
}

const BannerContainer = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;

  background-color: ${themer("accent")};
  color: ${themer("shade.darker")};
`
