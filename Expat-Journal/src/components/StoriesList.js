import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utilities/axiosWithAuth";
import StoriesGetCard from "./StoriesGetCard";

// const dummyData = [
    
//     {   
//         id: 1,
//         story_title: "A Place To Be",
//         story_body: "Lorem ipsum, lorem ipsum dolor sit amet, Lorem, dummy text, loren ipsum (yes, spelled wrong), Lorem ipsum sample textipsum loremlorem ipsum sample, Latin copy text, Lorem ipsum text, Latin dummy text, template text, sample text, dummy copy text, Latin sample text, HTML dummy text, Lorem ipsum dummy text."
//     },
//     {   
//         id: 2,
//         story_title: "It Was Too Scary That Night",
//         story_body: "Lorem ipsum, lorem ipsum dolor sit amet, Lorem, dummy text, loren ipsum (yes, spelled wrong), Lorem ipsum sample textipsum loremlorem ipsum sample, Latin copy text, Lorem ipsum text, Latin dummy text, template text, sample text, dummy copy text, Latin sample text, HTML dummy text, Lorem ipsum dummy text"
//     },
//     {   
//         id: 3,
//         story_title: "I Can't Believe That I Spent that Much",
//         story_body: "Lorem ipsum, lorem ipsum dolor sit amet, Lorem, dummy text, loren ipsum (yes, spelled wrong), Lorem ipsum sample textipsum loremlorem ipsum sample, Latin copy text, Lorem ipsum text, Latin dummy text, template text, sample text, dummy copy text, Latin sample text, HTML dummy text, Lorem ipsum dummy text."
//     }

// ]

const StoriesList = () => {
  const [storiesList, setStoriesList] = useState([]);


  useEffect(() => {
    axiosWithAuth()
      .get("https://ptct-expat-journal-backend.herokuapp.com/stories")
      .then((res) => {
        console.log("this is the response:", res);
        setStoriesList(res.data);
      })
      .catch((err) => {
        console.error("the Erros is:", err);
      });
  }, []);

  return (

    <>
    <div>
      <button>Add Story</button>
    </div>
      <div>
        <ol>
          {storiesList.map((story) => (
            <StoriesGetCard key={story.id} 
            story_title={story.story_title}
            story_body={story.story_body}
            story={story} />
          ))}
        </ol>
      </div>
    </>

  );
};

export default StoriesList;
