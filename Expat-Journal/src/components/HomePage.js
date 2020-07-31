import React from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import ImgGit from "./ImgGit";
import StoriesList from "./StoriesList";

const HomePage = () => {
  return (
    <>
      <h1>Our Journal</h1>
      <StoriesList />
      <ImgGit />
    </>
  );
};

export default HomePage;
