import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";


//I created a dummyData until I get data link from BackEnd
const dummyData = [
    {
        id: 0,
        name: "Jorge Jimenez",
        story: "This is a nice place in colombia where I enjoy with my family",
        img: "https://images.unsplash.com/photo-1500815845799-7748ca339f27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&q=80"
    },
    {
        id: 1,
        name: "Carlos Llano",
        story: "I enjoy a lot this place because I could meditate a lot",
        img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=431&q=80"
    },
    {
        id: 2,
        name: "Jean Bloom",
        story: "This is my second time coming here, and I love staying here for vacations ",
        img: "https://images.unsplash.com/photo-1519160558534-579f5106e43f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
    },
    {
        id: 3,
        name: "Patrick Smith",
        story: "I cant complain about this placee, it was peaceful, and I enjoyed every moment here",
        img: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=414&q=80"
    },
    {
        id: 4,
        name: "Gina Garcia",
        story: "What Can I Say? The images explain everything",
        img: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80"
    }
]

const UserInfo = (props) => {
  console.log("props", props)
  const [users, setUsers] = useState(dummyData);
  const params = useParams();
  console.log("Params", params);
  const match = useRouteMatch();
  console.log("match", match);


const history = useHistory();
const { url, path } = match;

// I will uncomment this when Ill get the data from BackEnd
//   useEffect(() => {
//     const id = url;
//     // console.log("id is :",id);


//        axios
//         .get(`https://ptct-expat-journal-backend.herokuapp.com${id}`)
//         .then(res => {
//             console.log("this is the response:", res)
//           setUsers(res.data);
//         })
//         .catch(err => {
//           console.error("the Erros is:", err);
//         });

//   },[url]);


//this is only for DummyData
const user = users.find(story => `${story.id}` === params.id);
  
  

  if (!users) {
    return <div>Loading user information...</div>;
  }

 
  return (

    <>
        <div>
            <h2> {user.name} Profile</h2>
            <div>
                <img src={user.img}/>
            </div>
            <div>
                <p>Story: {user.story}</p>
            </div>
        </div>
        <button type="button" onClick={() => history.goBack()}>
        Go Back
        </button>
    </>
  );
}

export default UserInfo;
