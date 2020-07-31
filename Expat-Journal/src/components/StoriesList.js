import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utilities/axiosWithAuth";
import StoriesGetCard from "./StoriesGetCard";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const StoriesContainer = styled.div`
  margin: 20px;
  width: 500px;
  margin: 8px 0 0 1px;
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

// const dummyData = [

//     {
//         id: 1,
//         story_title: "A Place To Be",
//         story_body: "Lorem ipsum, lorem ipsum dolor sit amet, Lorem, dummy text, loren ipsum (yes, spelled wrong), Lorem ipsum sample textipsum loremlorem ipsum sample, Latin copy text, Lorem ipsum text, Latin dummy text, template text, sample text, dummy copy text, Latin sample text, HTML dummy text, Lorem ipsum dummy text."
//     },
//     {
//         id: 2,
//         story_title: "It Was Too Scary That Night",
//         story_body: "Lorem ipsum, lorem ipsum dolor sit amet, Lorem, dummy text, loren ipsum (yes, spelled wrong), Lorem ipsum sample textipsum loremlorem ipsum sample, Latin copy text, Lorem ipsum text, Latin dummy text, template text, sample text, dummy copy text, Latin sample text, HTML dummy text, Lorem ipsum dummy text"
//     },
//     {
//         id: 3,
//         story_title: "I Can't Believe That I Spent that Much",
//         story_body: "Lorem ipsum, lorem ipsum dolor sit amet, Lorem, dummy text, loren ipsum (yes, spelled wrong), Lorem ipsum sample textipsum loremlorem ipsum sample, Latin copy text, Lorem ipsum text, Latin dummy text, template text, sample text, dummy copy text, Latin sample text, HTML dummy text, Lorem ipsum dummy text."
//     }

// ]

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
        {storiesList.map((story) => (
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
