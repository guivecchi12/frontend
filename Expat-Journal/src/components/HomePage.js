import React from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { Link } from "react-router-dom";
import StoriesList from "./StoriesList";
import styled from "styled-components";

const Stories = styled.div`
margin-left: 30px;
`

const HomePage = () => {
  return (
    <>
      <h1>Created</h1>
      <Stories>
        <StoriesList />
      </Stories>
    </>
  );
};

export default HomePage;
