import styled from "styled-components"
import { media, themer } from "../../../styles/helpers"

const MediaContent = styled.main`
  margin: 0 auto;
  padding: 1rem 4rem;
  ${media.tablet`
    padding: 1rem;
  `}
  p {
    position: relative;
    margin: 2.5rem 0;
  }
  time {
    text-align: center;
    display: block;
    font-style: italic;
    text-decoration: underline ${themer("accent")};
    &:before {
      content: "Last Updated: ";
    }
  }
  img {
    border: 2px solid ${themer("accent")};
    max-width: 100%;
    display: block;
    margin: 1rem auto;
  }
  a {
    font-weight: 500;
    background: ${themer("accent")}88;
    background: linear-gradient(
      transparent 65%,
      ${themer("accent")}88 65% 100%
    );
  }
  figcaption {
    text-align: center;
    font-style: italic;
    color: ${themer("shade.mid")};
  }
  li > p {
    margin: 0;
  }
  li {
    margin: 2.5rem;
  }
  blockquote {
    background: ${themer("accent")}22;
    border: 0 solid ${themer("accent")};
    border-width: 0 0 0 0.5rem;
    padding-left: 1.5rem;
  }
`

export default MediaContent
