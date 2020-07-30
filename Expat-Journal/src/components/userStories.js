import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utilities/axiosWithAuth";
import AddStory from "../components/addStory";

const StoriesList = ({ user }) => {
  const [stories, setStories] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const getStories = () => {
    axiosWithAuth()
      .get(
        `https://ptct-expat-journal-backend.herokuapp.com/users/${user.user_id}/stories`
      )
      .then((res) => {
        console.log(res);
        setStories(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRefresh(false);
      });
  };

  useEffect(() => {
    getStories();
  }, [refresh]);

  return (
    <div>
      <div className="storiesList">
        <AddStory addstory={AddStory} />
        {stories
          .slice(0)
          .reverse()
          .map((story) => (
            <div className="story" key={story.story_id}>
              <p>Title: {story.story_title}</p>
              <p>Story: {story.story_body}</p>
            </div>
          ))}
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
