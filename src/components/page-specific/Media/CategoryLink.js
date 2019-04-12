import { Link } from "gatsby"
import styled from "styled-components"

const CategoryLink = styled(Link)`
  display: inline-block;
  min-width: 250px;
  padding: 1.5rem 3rem;
  position: relative;
  margin: 2rem;
  transition: all 0.2s ease;
  transform:  skew(5deg);
  border: 5px solid ${({ theme }) => theme.accent};
  &:before {
    ${({ theme }) => theme.before}
    background: ${({ theme }) => theme.accent};
    opacity: 0.1;
    transition: all 0.2s ease;
  }
  h3 {
    margin: 0;
  }
  span {
    position: relative;
    font-weight: bold;
    &:before {
      ${({ theme }) => theme.before}
      background: ${({ theme }) => theme.accent};
      width: 110%;
      height: 35%;
      top: 60%;
      transform: translateX(-5%);
    }
  }
  
  &:hover {
    &:before {
      opacity: 0.3;
    }
    transform:  skew(-5deg) ;
  }
`

export default CategoryLink
