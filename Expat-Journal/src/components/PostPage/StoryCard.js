import React from "react";

const StoryCard = (props) => {
  const { story_title, story_body, story_img } = props.story;
  return (
    <div className="story-card">
      <img>{story_img}</img>
      <h2>{story_title}</h2>
      <p>{story_body}</p>
    </div>
  );
};

export default Story;
