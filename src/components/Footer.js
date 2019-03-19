import React from "react"
import styled from "styled-components"

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.shade.darker};
  height: 50vh;
`

const Footer = ({ handleToggle, showSideBar }) => {
  return (
    <StyledFooter>
      <br />
    </StyledFooter>
  )
}

export default Footer
