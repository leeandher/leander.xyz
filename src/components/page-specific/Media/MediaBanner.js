import React from "react"
import styled from "styled-components"
import { themer } from "../../../styles/helpers"

const BannerImage = styled.img`
  width: 100%;
  height: 450px;
  position: relative;
  object-fit: cover;
`

const BannerWrapper = styled.div`
  position: relative;
  margin: 1rem -2rem;
  border: 0 solid ${themer("accent")};
  border-top-width: 5px;
  &:after {
    ${themer("before")};
    background: linear-gradient(
      transparent,
      ${themer("shade.lightest")} 98%,
      ${themer("shade.lightest")}
    );
    z-index: 10;
  }
`

const MediaBanner = imageProps => {
  return (
    <BannerWrapper>
      <BannerImage {...imageProps} />
    </BannerWrapper>
  )
}

export default MediaBanner
