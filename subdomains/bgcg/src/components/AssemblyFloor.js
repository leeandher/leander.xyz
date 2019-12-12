import React, { useState } from "react";
import styled from "styled-components";

import Preview from "./Preview";
import StepButton from "./StepButton";

const AssemblyFloorWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const AssemblyFloor = () => {
  const [isButtered, setButtered] = useState(false);
  const [isCheese, setCheese] = useState(false);
  const [isAssembled, setAssembled] = useState(false);
  const [isGrilled, setGrilled] = useState(false);
  const [isChomped, setChomped] = useState(false);

  return (
    <AssemblyFloorWrapper>
      <Preview
        isButtered={isButtered}
        isCheese={isCheese}
        isAssembled={isAssembled}
        isGrilled={isGrilled}
        isChomped={isChomped}
      />
      <StepButton onClick={() => setButtered(true)} disabled={isButtered}>
        Step 1: Butter
      </StepButton>
      <StepButton
        disabled={!isButtered || isCheese}
        onClick={() => setCheese(true)}
      >
        Step 2: Cheese
      </StepButton>

      <StepButton
        disabled={!isCheese || isAssembled}
        onClick={() => setAssembled(true)}
      >
        Step 3: Assemble
      </StepButton>
      <StepButton
        disabled={!isAssembled || isGrilled}
        onClick={() => setGrilled(true)}
      >
        Step 4: Grill
      </StepButton>
      <StepButton
        disabled={!isGrilled || isChomped}
        onClick={() => setChomped(true)}
      >
        Step 5: Chomp
      </StepButton>
      <StepButton
        disabled={!isChomped}
        onClick={() => {
          setButtered(false);
          setCheese(false);
          setAssembled(false);
          setGrilled(false);
          setChomped(false);
        }}
      >
        Step 6: Repeat
      </StepButton>
    </AssemblyFloorWrapper>
  );
};

export default AssemblyFloor;
