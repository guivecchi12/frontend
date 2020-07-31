import React from "react";
import styled from "styled-components";

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

const StoriesGetCard = (props) => {
  return (
    <>
      <div>
        <h2>{props.story_title}</h2>
      </div>
      <div>
        <p>{props.story_body}</p>
      </div>
    </>
  );
};

export default StoriesGetCard;
