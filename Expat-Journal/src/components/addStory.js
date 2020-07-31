import React, { useState, useContext } from "react";
import axiosWithAuth from "../utilities/axiosWithAuth";
import { UserContext } from "../context/UserContext";
import japan from "../Img/japan.jpg";
import styled from "styled-components";

const StoryContainer = styled.div`
  h1 {
    font-weight: 400;
    font-size: 1.8rem;
    text-align: center;
    padding-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 40px auto;
    padding: 40px;
    border: 2px solid black;
    border-radius: 5px;
    background-color: white;
    height: auto;
    align-items: center;

    label {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 0 10px 0;
      padding: 0 0 20px 0;
      font-size: 1.5rem;
      color: black;
    }

    input {
      width: 250px;
      margin: 8px 0 0 1px;
      border: 2px solid black;
      border-radius: 6px;
      padding: 10px 20px;
      font-size: 1.3rem;
    }

    input[type="text"],
    textarea {
      transition: all 0.3s ease-in-out;
      outline: none;
    }

    input[type="text"]:focus,
    textarea:focus {
      box-shadow: 0 0 5px rgba(81, 203, 238, 1);
      border-color: rgba(81, 203, 238, 1);
    }
  }

  button {
    width: 150px;
    background-color: black;
    color: white;
    font-size: 1.2rem;
    margin: 30px 0 0 75px;
    padding: 8px 11px;
    cursor: pointer;
    border: 2px black solid;
    border-radius: 5px;
    &:hover {
      background-color: #778899;
      color: #f0fff0;
    }
  }

  button:disabled {
    background-color: white;
    border: 1px solid silver;
    color: gray;
    cursor: not-allowed;
  }

  legend {
    font-size: 2.5rem;
  }
`;

const initialStory = {
  story_title: "",
  story_body: "",
};
const AddStory = ({ stories, getStories }) => {
  const [editing, setEditing] = useState(false);
  const [story, setStory] = useState(initialStory);
  const { user } = useContext(UserContext);
  const id = localStorage.getItem("UserID");
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

  const updateStory = () => {
    console.log("your stories:", stories);
    axiosWithAuth()
      .put(`/users/${user.id}/stories/${story.id}`, story)
      .then((res) => {
        console.log("PUT REQUEST: ", story);
        getStories();
        // setEditing(true);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const saveStory = () => {
    axiosWithAuth()
      .post(`/users/${user.id}/stories`, story)
      .then((res) => {
        getStories();
        reset();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const deleteStory = (story) => {
    axiosWithAuth()
      .delete(`/users/${user.id}/stories/${story.id}`)
      .then((res) => {
        getStories();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setStory({
      ...story,
      [name]: value,
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
    <StoryContainer>
      <form onSubmit={handleFormSubmit}>
        <legend>{`${editing ? "Change a" : "Contribute a"} Story`}</legend>
        <label>
          Title:
          <input
            type="text"
            name="story_title"
            onChange={changeHandler}
            placeholder="Title"
            value={story.story_title}
          />
        </label>
        <label>
          Story:
          <input
            type="text"
            name="story_body"
            onChange={changeHandler}
            placeholder="Story"
            value={story.story_body}
          />
        </label>
        <div className="button-row">
          <button type="submit">{editing ? "update" : "save"}</button>
          <button onClick={reset}>cancel</button>
        </div>
      </form>
      <p>Stories</p>
      <ol>
        {[...stories].reverse().map((story) => (
          <li key={story.story_id}>
            <span>
              <button onClick={() => editStory(story)}>Edit</button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteStory(story);
                }}
              >
                Remove
              </button>
              {""}
              <p>Title: {story.story_title}</p>
              <p>Story: {story.story_body}</p>
            </span>
          </li>
        ))}
      </ol>
      <div className="spacer" />
    </StoryContainer>
  );
};
export default AddStory;
