import React from "react";
import ImgGit from "./ImgGit";
import StoriesList from "./StoriesList";
import styled from "styled-components";

const ImgStor = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: "Permanent Marker", cursive;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 8rem;
  font-weight: 500;
  letter-spacing: 0.15rem;
  line-height: 1;
  text-shadow: #d4a218 0.1875rem 0.125rem 0;
  position: relative;
  margin: 2rem;
`;

const HomePage = () => {
  return (
    <div className="container">
      <Title>Our Journal</Title>
      <ImgStor>
        <StoriesList />
        <ImgGit />
      </ImgStor>
    </div>
  );
};

export default HomePage;
