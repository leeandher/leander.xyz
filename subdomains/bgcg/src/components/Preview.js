import React from "react";
import styled from "styled-components";

import BreadWhiteImage from "../assets/bread-white.png";
import ButteredBreadImage from "../assets/bread-buttered.png";
import CheeseCheddarImage from "../assets/cheese-cheddar.png";
import GrilledCheeseImage from "../assets/grilled-cheese.png";
import CrumbsImage from "../assets/crumbs.png";

const PreviewWrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  min-height: 300px;
  img {
    max-width: 350px;
    max-height: 400px;
  }
  .sandwich-assembly {
    position: relative;
    display: ${({ isGrilled }) => (isGrilled ? "none" : "inline-block")};
  }
  .onTop {
    position: absolute;
    left: 0;
  }
  .bread-top {
    top: -50px;
  }
  .grilled-boye {
    display: ${({ isGrilled, isChomped }) =>
      !isGrilled || isChomped ? "none" : "inline-block"};
  }
  .all-gone {
    display: ${({ isChomped }) => (!isChomped ? "none" : "inline-block")};
  }
`;

const Preview = ({
  isCheese,
  isButtered,
  isAssembled,
  isGrilled,
  isChomped
}) => {
  return (
    <PreviewWrapper isGrilled={isGrilled} isChomped={isChomped}>
      <div className="sandwich-assembly">
        <img
          src={isButtered ? ButteredBreadImage : BreadWhiteImage}
          alt={
            isButtered ? "Smooth buttery goodness" : "Uncultured plain bread"
          }
          title={
            isButtered ? "Smooth buttery goodness" : "Uncultured plain bread"
          }
        />
        {isCheese && (
          <img
            className="cheese onTop"
            src={CheeseCheddarImage}
            alt="The good stuff"
            title="The good stuff"
          />
        )}
        {isAssembled && (
          <img
            className="bread-top onTop"
            src={ButteredBreadImage}
            alt="A wonderous creation"
            title="A wonderous creation"
          />
        )}
      </div>
      {!isAssembled && (
        <img
          src={isButtered ? ButteredBreadImage : BreadWhiteImage}
          alt={
            isButtered ? "Smooth buttery goodness" : "Uncultured plain bread"
          }
          title={
            isButtered ? "Smooth buttery goodness" : "Uncultured plain bread"
          }
        />
      )}
      <img
        className="grilled-boye"
        src={GrilledCheeseImage}
        alt="A beautiful grilled cheese"
        title="A beautiful grilled cheese"
      />
      <img
        className="all-gone"
        src={CrumbsImage}
        alt="If only we had more time together"
        title="If only we had more time together"
      />
    </PreviewWrapper>
  );
};

export default Preview;
