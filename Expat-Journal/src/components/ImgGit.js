import axiosWithAuth from "../utilities/axiosWithAuth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImgCard from "./ImgGetCard";
import styled from "styled-components";

const ImgContainer = styled.div`
  margin: 20px;
  width: 45%;
  border: 2px solid black;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .button {
    padding-bottom: 30px;
    button {
      width: 150px;
      background-color: black;
      color: white;
      font-size: 1.2rem;
      margin: 30px 0 0 0;
      padding: 5px 9px;
      cursor: pointer;
      border: 2px black solid;
      border-radius: 5px;
      &:hover {
        background-color: #778899;
        color: #f0fff0;
      }
    }
  }
`;

const ImgCon = styled.div`
  img {
    max-width: 100%;
  }
`;

const ImgGit = (props) => {
  const [Imgs, setImgs] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/images")
      .then(function (response) {
        setImgs(response.data);
        console.log(response);
      });
  }, []);

  useEffect(() => {
    console.log(Imgs);
  }, [Imgs]);

  //add an button =(https://ptct-expat-journal-backend.herokuapp.com/users/addImages)
  return (
    <ImgContainer>
      <Link to="/addImages">
        <button> Add Image </button>
      </Link>
      <ImgCon>
        {[...Imgs].reverse().map((data, i) => (
          <ImgCard data={data} key={i} />
        ))}
      </ImgCon>
    </ImgContainer>
  );
};

export default ImgGit;
