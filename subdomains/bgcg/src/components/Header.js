import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  padding: 2em;
  text-align: center;
  h1 {
    margin: 0;
    font-size: 4.5em;
  }
  h2 {
    margin: 0;
    font-size: 2em;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>B.G.C.G.</h1>
      <h2>(Best Grilled Cheese Generator)</h2>
    </HeaderWrapper>
  );
};

export default Header;
