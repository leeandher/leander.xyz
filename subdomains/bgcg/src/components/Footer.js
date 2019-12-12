import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  padding: 2em;
  text-align: center;
  p {
    margin: 2em;
    font-size: 1.5em;
  }
  small {
    display: block;
    font-size: 0.85em;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>
        Crafted with{" "}
        <span role="img" aria-label="sandwich">
          🥪
        </span>{" "}
        by{" "}
        <a href="https://leander.xyz" target="_blank" rel="noopener noreferrer">
          Leander
        </a>
        <br />
        <small>
          Also, the page reads your preferred colour scheme (you're welcome)
          <small>
            ((
            <span role="img" aria-label="dark-moon">
              🌑
            </span>{" "}
            Dark Mode FTW{" "}
            <span role="img" aria-label="dark-moon">
              🌑
            </span>
            ))
          </small>
        </small>
      </p>
    </FooterWrapper>
  );
};

export default Footer;
