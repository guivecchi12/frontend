import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialStory = {
  story_title: "",
  story_body: "",
};

const StoryList = ({ stories, updateStories }) => {
  const [editing, setEditing] = useState(false);
  const [story, setStory] = useState(initialStory);

  const editStory = (story) => {
    setEditing(true);
    setStory(story);
  };

  const reset = () => {
    setStory(initialStory);
    setEditing(false);
  };

  const saveStory = () => {
    axiosWithAuth()
      .post(`/users/${user_id}/stories`, story)
      .then((res) => {
        const stories = res.data;
        updateStories(stories);
        reset();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const updateStory = () => {
    axiosWithAuth()
      .put(`/users/${user_id}/stories/${story_id}`, story)
      .then((res) => {
        const updatedStories = stories.map((story) =>
          story.story_id === res.data.id ? res.data : story
        );
        updateStories(updatedStories);
        reset();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const deleteStory = (story) => {
    axiosWithAuth()
      .delete(`/users/${user_id}/stories/${story_id}`)
      .then((res) => {
        const updatedStories = stories.filter(
          (story) => story.story_id !== res.data
        );
        updateStories(updatedStories);
        setStory(initialStory);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!(story.story_title && story.story_body)) {
      return;
    }
    if (story.story_id) {
      updateStory();
    } else {
      saveStory();
    }
  };

  return (
    <div className="story-wrap">
      <form onSubmit={handleFormSubmit}>
        <legend>{`${editing ? "edit" : "add"} story`}</legend>
        <label>
          Title:
          <input
            onChange={(e) => setStory({ ...story, story: e.target.value })}
            value={story.story}
          />
        </label>
        <label>
          Story:
          <input
            onChange={(e) =>
              setStory({
                ...Story,
                story: e.target.value,
              })
            }
            value={story.story}
          />
        </label>
        <div className="button-row">
          <button type="submit">{editing ? "update" : "save"}</button>
          <button onClick={reset}>cancel</button>
        </div>
      </form>
      <p>stories</p>
      <ul>
        {stories.map((story) => (
          <li key={story.story} onClick={() => editStory(story)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteStory(story);
                }}
              >
                x
              </span>{" "}
              {story.story_title}
            </span>
            <span>{story.story_body}</span>
          </li>
        ))}
      </ul>
      <div className="spacer" />
    </div>
  );
};

export default StoryList;
