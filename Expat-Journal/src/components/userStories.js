import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utilities/axiosWithAuth";
import AddStory from "../components/addStory";
import { UserContext } from "../context/UserContext";
import japan from "../Img/japan.jpg";
import styled from "styled-components";

const StoryContainer = styled.div`
  background: linear-gradient(90deg, #061157 0%, #ff922d 100%);
  height: 100vh;
  margin-top: -30px;
  padding-top: 40px;
`;

const StoriesList = () => {
  const [stories, setStories] = useState([]);
  const { user } = useContext(UserContext);

  const getStories = () => {
    axiosWithAuth()
      .get(
        `https://ptct-expat-journal-backend.herokuapp.com/users/${user.id}/stories`
      )
      .then((res) => {
        console.log(res);
        setStories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getStories();
  }, []);

  return (
    <StoryContainer>
      <div className="storiesList">
        <AddStory stories={stories} getStories={getStories} />
      </div>
    </StoryContainer>
  );
};
export default StoriesList;
