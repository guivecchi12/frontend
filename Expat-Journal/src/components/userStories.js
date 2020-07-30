import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../utilities/axiosWithAuth";
import AddStory from "../components/addStory";
import { UserContext } from "../context/UserContext";

const StoriesList = () => {
  const [stories, setStories] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <div className="storiesList">
        <AddStory stories={stories} updateStories={setStories} />
      </div>
    </div>
  );
};

export default StoriesList;

// import React, { useState, useEffect } from "react";
// import { axiosWithAuth } from "../utils/axiosWithAuth";
// import StoryList from "../components/addStory";

// const userStories = ({ user }) => {
//   const [story, setStory] = useState([]);

//   const getStories = (props) => {
//     axiosWithAuth()
//       .get(`/users/${user.id}/stories`)
//       .then((res) => {
//         console.log(res);
//         setStory(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     getStories();
//   }, []);

//   return (
//     <>
//       <StoryList stories={story} updateStories={setStory} />
//     </>
//   );
// };

// export default userStories;
