import React, { useEffect, useReducer, useImperativeHandle } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";


const AddImage = ({user}) => {
    console.log("the user passed into AddImage: ", user);
    
    
    const getImages = () =>{
        axiosWithAuth()
            .get(`/users/${user.id}/images`, user.token)
            .then(res => console.log("addImages GET: ", res))
            .catch(err => console.log("addImages GET error", err))
    }

    useEffect(()=>{
        getImages();
    },[]);

    return(
        <>
            <h1>Welcome User: {user.id}</h1>

        </>
    )
}

export default AddImage;