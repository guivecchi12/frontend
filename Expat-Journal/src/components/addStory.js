import React, { useState, useContext } from "react";
import axiosWithAuth from "../utilities/axiosWithAuth";
import { UserContext } from "../context/UserContext";
const initialStory = {
  story_title: "",
  story_body: "",
};
const AddStory = ({ stories, updateStories, getStories }) => {
  const [editing, setEditing] = useState(false);
  const [story, setStory] = useState(initialStory);
  const { user } = useContext(UserContext);
  const array = [];
  const editStory = (story) => {
    setEditing(true);
    setStory(story);
    getStories();
  };
  const reset = () => {
    setStory(initialStory);
    setEditing(false);
    getStories();
  };
  const updateStory = (storys) => {
    console.log("your stories:", stories);
    axiosWithAuth()
      .put(`/users/${user.id}/stories/${story.id}`, story)
      .then((res) => {
        console.log("PUT REQUEST: ", story);
        // const updatedStories = stories.map((story) =>
        //   story.story_id === res.data.id ? res.data : story
        // );
        // updateStories(updatedStories);
        getStories();
        setEditing(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const saveStory = () => {
    axiosWithAuth()
      .post(`/users/${user.id}/stories`, story)
      .then((res) => {
        console.log("POST REQUEST: ", res.data);
        getStories();
        // const stories = res.data;
        console.log(stories);
        // updateStories(oldStories => [...oldStories, stories]);
        reset();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  const deleteStory = (story) => {
    console.log("STORY in Delete: ", story);
    axiosWithAuth()
      .delete(`/users/${user.id}/stories/${story.id}`)
      .then((res) => {
        console.log("DELETE RESponse: ", res);
        getStories();
        // const updatedStories = stories.filter(
        //   (story) => story.story_id !== res.data
        // );
        // updateStories(updatedStories);
        // setStory(initialStory);
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
    if (story.id) {
      updateStory();
    } else {
      saveStory();
    }
  };
  console.log("Your stories: ", stories);
  return (
    <div className="story-wrap">
      <form onSubmit={handleFormSubmit}>
        <legend>{`${editing ? "edit" : "add"} story`}</legend>
        <label>
          Title:
          <input
            onChange={(e) =>
              setStory({ ...story, story_title: e.target.value })
            }
            value={story.story_title}
          />
        </label>
        <label>
          Story:
          <input
            onChange={(e) =>
              setStory({
                ...story,
                story_body: e.target.value,
              })
            }
            value={story.story_body}
          />
        </label>
        <div className="button-row">
          <button type="submit">{editing ? "update" : "save"}</button>
          <button onClick={reset}>cancel</button>
        </div>
      </form>
      <p>stories</p>
      <ol>
        {stories
          .splice(0)
          .reverse()
          .map((story) => (
            <li key={story.story_id} onClick={() => editStory(story)}>
              <span>
                <span
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteStory(story);
                  }}
                >
                  x
                </span>
                {""}
                <p>Title: {story.story_title}</p>
                <p>Story: {story.story_body}</p>
              </span>
            </li>
          ))}
      </ol>
      <div className="spacer" />
    </div>
  );
};
export default AddStory;
