import React, { useState } from "react";
import { axiosWithAuth } from "../../utilities/axiosWithAuth";

const initalStory = {
  imgs_id: "",
  story_title: "",
  story_body,
};

const StoryList = ({ stories, updateStories }) => {
  const [editing, setEditing] = useState(false);
  const [story, setStory] = useState(initalStory);

  const editStory = (story) => {
    setEditing(initalStory);
    setEditing(story);
  };

  const reset = () => {
    setStory(initalStory);
    setEditing(false);
  };

  const updateStory = () => {
    axiosWithAuth()
      .put(``, story)
      .then((res) => {
        const updatedStories = stories.map((story) =>
          story.id === res.data.id ? res.data : story
        );
        updateStories(updatedStories);
        reset();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const saveStory = () => {
    axiosWithAuth()
      .post("", story)
      .then((res) => {
        const stories = res.data;
        updateStories(stories);
        reset();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const deleteStory = (story) => {
    axiosWithAuth()
      .delete(``)
      .then((res) => {
        const updatedStories = stories.filter((story) => story.id !== res.data);
        updateStories(updatedStories);
        setStory(initalStory);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!(story.story && story.id)) {
      return;
    }
    if (story.id) {
      updateStory();
    } else {
      saveStory();
    }
  };
};

// Linkimport React from "react";
// import { Link } from "react-router-dom";
// import StoryCard from "./StoryCard";

// function StoryList({ stories }) {
//   return (
//     <div className="story-list">
//       {stories.map((story) => (
//         <Link key={story.id} to={`/postpage/${story.id}`}>
//           <StoryCard story={story} />
//         </Link>
//       ))}
//     </div>
//   );
// }
