import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";


const AddImage = ({ user }) => {
    
    const [ imgs, setImgs ] = useState([]);
    const [ newImg, setNewImg ] = useState({ img:"" });
    
    const getImages = () =>{
        axiosWithAuth()
            .get(`/users/${user.id}/images`)
            .then(res => {
                console.log("addImages GET: ", res);
                setImgs(res);
            })
            .catch(err => console.log("addImages GET error", err))
    }

    useEffect(()=>{
        getImages();
    },[]);

    const addImg = e => {
        e.preventDefault();
        console.log("the new img: ", newImg);
        setImgs([...imgs, newImg.img]);
        console.log("your imgs: ", imgs);

    }


    return(
        <>
            <h1>Welcome User: {user.id}</h1>
            <form onSubmit={addImg}>
                <legend>Add a Image</legend>
                <label>
                    Url: 
                    <input
                        type="text"  
                        name = "url"
                        onChange = { e => setNewImg({...newImg, img: e.target.value })}
                        value = { newImg.img }
                    />
                </label>
                <button>add</button>
            </form>

        </>
    )
}

export default AddImage;