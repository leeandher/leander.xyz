import React from "react";
import styled from "styled-components";

const StepButtonWrapper = styled.button`
  padding: 1em 2em;
  font-size: 1.75em;
  background: #fcdc25;
  color: #292929;
  transform: skew(-7deg) translateY(-3px);
  margin: 1.5em;
  width: 250px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.39, 0.575, 0.565, 1);
  &:hover&:not(:disabled) {
    opacity: 0.8;
    transform: skew(7deg) translateY(0px);
  }
  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
  p {
    margin: 0;
    font-weight: bold;
    letter-spacing: 1px;
    transform: skew(7deg);
  }
`;

const StepButton = ({ children, disabled, onClick }) => {
  return (
    <StepButtonWrapper disabled={disabled} onClick={onClick}>
      <p>{children}</p>
    </StepButtonWrapper>
  );
};

export default StepButton;
