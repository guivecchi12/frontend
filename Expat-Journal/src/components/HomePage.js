import React from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import { Link } from 'react-router-dom';
import StoriesList from './StoriesList'


const HomePage = () => {
    return(
        <>
            <h1>Created</h1>
            <Link to="/addImages">Click to see your images</Link>
            <div>
                <StoriesList />
            </div>

        </>
    )
}

export default HomePage;