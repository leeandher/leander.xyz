import React from "react";
import styled from "styled-components";

import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import AssemblyFloor from "./components/AssemblyFloor";
import Footer from "./components/Footer";

const AppWrapper = styled.div`
  margin: 3em auto;
  max-width: 960px;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <Header />
        <AssemblyFloor />
        <Footer />
      </AppWrapper>
    </>
  );
};

export default App;
