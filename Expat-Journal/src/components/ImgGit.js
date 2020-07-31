import axiosWithAuth from "../utilities/axiosWithAuth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImgCard from "./ImgGetCard";

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
    <div>
      <Link to="/addImages">
        <button> Add Image </button>
      </Link>
      {[...Imgs].reverse().map((data, i) => (
        <ImgCard data={data} key={i} />
      ))}
    </div>
  );
};

export default ImgGit;
