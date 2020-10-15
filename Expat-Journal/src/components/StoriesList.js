import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utilities/axiosWithAuth";
import StoriesGetCard from "./StoriesGetCard";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StoriesContainer = styled.div`
  margin: 20px;
  width: 45%;
  border: 2px solid black;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 1.3rem;
  .button {
    text-align: center;
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

const StoriesList = () => {
  const [storiesList, setStoriesList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://ptct-expat-journal-backend.herokuapp.com/stories")
      .then((res) => {
        console.log("this is the response:", res);
        setStoriesList(res.data);
      })
      .catch((err) => {
        console.error("the Erros is:", err);
      });
  }, []);

  return (
    <StoriesContainer>
      <Link to="/addStory">
        <div className="button">
          <button>Add Story</button>
        </div>
      </Link>
      <ol>
        {[...storiesList].reverse().map((story) => (
          <StoriesGetCard
            key={story.id}
            story_title={story.story_title}
            story_body={story.story_body}
            story={story}
          />
        ))}
      </ol>
    </StoriesContainer>
  );
};

export default StoriesList;
