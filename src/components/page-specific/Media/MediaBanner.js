import React from "react"
import styled from "styled-components"
import { themer } from "../../../styles/helpers"

const BannerImage = styled.img`
  width: 100%;
  height: 250px;
  position: relative;
  object-fit: cover;
`

const BannerWrapper = styled.div`
  margin: -10rem -2rem 0;
  position: relative;
  &:after {
    ${themer("before")};
    background: linear-gradient(transparent, ${themer("shade.lightest")});
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
