import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utilities/axiosWithAuth";
import AddStory from "../components/addStory";
import { UserContext } from "../context/UserContext";

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
    <div>
      <div className="storiesList">
        <AddStory
          stories={stories}
          updateStories={setStories}
          getStories={getStories}
        />
      </div>
    </div>
  );
};
export default StoriesList;
