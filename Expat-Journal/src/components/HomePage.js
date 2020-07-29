import React from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { Link } from 'react-router-dom';


const HomePage = ({props}) => {
    return(
        <>
            <h1>Created</h1>
            <Link to="/addImages">Click to see your images</Link>
        </>
    )
}

export default HomePage;