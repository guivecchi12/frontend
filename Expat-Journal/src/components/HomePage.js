import React from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import ImgGit from "./ImgGit";
import StoriesList from "./StoriesList";
import styled from "styled-components";

const ImgStor = styled.div`
  display: flex;
  flex-direction: row;
`;

const HomePage = () => {
  return (
    <div className="container">
      <Header />
      <h1>Our Journal</h1>
      <ImgStor>
        <StoriesList />
        <ImgGit />
      </ImgStor>
    </div>
  );
};

export default HomePage;
