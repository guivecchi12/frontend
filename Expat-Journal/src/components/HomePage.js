import React from "react";
import ImgGit from "./ImgGit";
import StoriesList from "./StoriesList";
import styled from "styled-components";

const ImgStor = styled.div`
  display: flex;
  justify-content: center;
`;

const HomePage = () => {
  return (
    <div className="container">
      <h1>Our Journal</h1>
      <ImgStor>
        <StoriesList />
        <ImgGit />
      </ImgStor>
    </div>
  );
};

export default HomePage;
