import React from "react";

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
