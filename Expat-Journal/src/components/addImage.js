import React, { useEffect, useState, useContext } from "react";
import axiosWithAuth from "../utilities/axiosWithAuth";
import { UserContext } from "../context/UserContext";
import "./addImage.css";

const initialState = {
    id: 0,
    img_url: "",
    user_id: 0
}

const AddImage = ({ user }) => {
    const { user } = useContext( UserContext );
    const [imgs, setImgs] = useState([]);
    const [addingImg, setAddingImg] = useState(initialState);
    const [edit, setEdit] = useState(false);
    const [editImg, setEditImg] = useState(initialState);
    const id = localStorage.getItem("userID");
    
    const getImages = () =>{
        axiosWithAuth()
            .get(`/users/${ id }/images`)
            .then(res => {
                // console.log("addImages GET: ", res.data);
                setImgs(res.data);
                setAddingImg({...addingImg, img_url: "", user_id: user.id});
            })
            .catch(err => console.log("addImages GET error", err))
    }

    useEffect(()=>{
        getImages();
        // setAddingImg({...addingImg, img_url: ""});
    },[]);


    const addImg = e => {
        e.preventDefault();
        
        axiosWithAuth()
          .post(`/users/${ id }/images/`, addingImg)
          .then(res=> {
            // console.log( "Response from POST adding image: ", res);
            getImages();
          })
          .catch (err => console.log(err));
    }

    const deleteImg = img => {
        axiosWithAuth()
            .delete(`/users/${ id }/images/${img.id}`)
            .then(res => {
                // console.log(res);
                getImages();
            })
            .catch(err => {console.log(err)})
    }

    const editingImg = img => {
        setEdit(true);
        setEditImg(img);
    }

    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/users/${ id }/images/${ editImg.id }`, editImg)
            .then(() => {
                setEdit(false);
                getImages();
            })
            .catch(err => console.log(err))
    }

    // const checkStates = () =>{
    //     console.log("imgs: ",imgs);
    //     console.log("addingImg: ", addingImg);
    //     console.log("Image editing", editImg);
    // }
    

    return(
        <>
            <h1>Welcome {user.username}</h1>
            <div className = "boxes">
                
                    <form onSubmit={addImg}>
                        <legend>Add an Image</legend>
                        <label>
                            URL: 
                            <input
                                type="text"  
                                name = "url"
                                onChange = {e => {e.persist(); setAddingImg({...addingImg, img_url: e.target.value})}}
                                value = { addingImg.img_url }
                            />  
                        </label>
                        <button>Add</button>
                    </form>
        

                {edit && (
                    <form onSubmit = {saveEdit}>
                        <legend>Edit Image URL</legend>
                        <label>
                            URL: 
                            <input
                                onChange = {e => {e.persist(); setEditImg({...editImg, img_url: e.target.value}); console.log(editImg) }}
                                value = { editImg.img_url }
                            />   
                        </label>
                        <button type="submit">Save</button>
                    </form>
                )}
            </div>
            <div className="userAlbum">
                {[...imgs].reverse().map(pic=>(
                    <div key = {pic.id} onClick ={() => editingImg(pic)} className = "userImgs" 
                        style={{
                            backgroundImage:`url(${pic.img_url})`,
                            backgroundSize:"auto 100%"
                        }}
                    >
                        {/* <img src={pic.img_url}/> */}
                        <span className = "delete" onClick = {e => {
                            e.stopPropagation(); 
                            deleteImg(pic) }}
                        > x </span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AddImage;