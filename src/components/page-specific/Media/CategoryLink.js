import { Link } from "gatsby"
import styled from "styled-components"

import { themer } from "../../../styles/helpers"

const CategoryLink = styled(Link)`
  display: inline-block;
  min-width: 250px;
  padding: 1.5rem 3rem;
  position: relative;
  margin: 2rem;
  transition: all 0.2s ease;
  transform:  skew(5deg);
  border: 5px solid ${themer("accent")};
  &:before {
    ${themer("before")}
    background: ${themer("accent")};
    opacity: 0.1;
    transition: all 0.2s ease;
  }
  &:after {
    ${themer("before")}
    background: ${themer("accent")};
    opacity: 0.3;
    max-height: 0;
    transition: all 0.2s ease;
  }
  h3 {
    margin: 0;
    text-align: center;
  }
  span {
    position: relative;
    font-weight: bold;
  }
  
  &:hover {
    &:after {
    max-height: 100%;
    }
    transform:  skew(-5deg) ;
  }
`

export default CategoryLink
