import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import userList from '../Img/userList.jpg'


const List = styled.div`
    display: flex;
    justify-content: space-around;
    text-align: center;
    flex-wrap: wrap;
    padding: 20px 0 0 20px; 

    h2 {
        color: #F5F5F5;
    }
    
        a {
            text-decoration: none;
            color: black;
        }

        .user-section {
            
            padding: 50px 0 40px 0;
            margin-bottom: 10px;
            &:hover {
                transform: scale(1.2);
            }

            .user-img {
                img {
                  width: 80%;
                  height: 80%;
                  border-radius: 5%;
                  border: 2px solid #F5F5F5;
                  box-shadow: 20px 20px 20px 0 black; 
                 }
            }
`

const ListContainer =styled.div`
    background-image: url(${userList});
    background-size: cover;
    margin-top: -38px;
    padding-bottom: 220px;
    width: auto;

    h1 {
        font-size: 3.5rem;
        text-align: center;
        padding: 110px 0 50px 0;
        font-weight: bold;
        text-shadow: 2px 2px #696969;
    }
`


//I created a dummyData for now. I will change this when I get the link from Backend
const dummyData = [
    {
        id: 0,
        label: "Pool time",
        img: "https://images.unsplash.com/photo-1500815845799-7748ca339f27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&q=80"
    },
    {
        id: 1,
        label: "Relaxing under the sun",
        img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=431&q=80"
    },
    {
        id: 2,
        label: "Spending time with me",
        img: "https://images.unsplash.com/photo-1519160558534-579f5106e43f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
    },
    {
        id: 3,
        label: "Beautiful day today",
        img: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=414&q=80"
    },
    {
        id: 4,
        label: "In the Ocean having a good time",
        img: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80"
    },
    {
        id: 4,
        label: "Hiking with my husband",
        img: "https://images.unsplash.com/photo-1500049242364-5f500807cdd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=381&q=80"
    }
]
           



const ImagesList = () => {

    const [imageList, setImageList] = useState(dummyData);

//   useEffect(() => {
//     const getImages = () => {
//       axios
//         .get('https://ptct-expat-journal-backend.herokuapp.com/users')
//         .then(res => {
//             console.log("The Response is:", res)
//           setImagesList(res.data);
//         })
//         .catch(err=> {
//           console.error('Server Error', err);
//         });
//     }

//     getImages();
//   }, []);


    return (
        
        <ListContainer>
          <h1>Expat Members</h1>
            <List>
                {imageList.map(user => (
                    <Link to={`/images/${user.id}`}>
                        <UserDetails key={user.id} user={user} />
                    </Link>
                ))}
            </List>
        </ListContainer>
    );
  }
  
  function UserDetails({ user }) {

    const { label, img } = user;

    return (

      <div className="user-section">
        <div className="user-img">
            <img src={img} />
        </div>
        <h2>{label}</h2>
      </div>
    );
  }

export default ImagesList;

