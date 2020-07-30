import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import StoryList from "../components/addStory";

const userStories = () => {
  const [storyList, setStoryList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get(`/users/${user_id}/stories`)
      .then((res) => {
        console.log(res);
        setStoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <StoryList stories={storyList} updateStories={setSotryList} />
    </>
  );
};

export default userStories;
