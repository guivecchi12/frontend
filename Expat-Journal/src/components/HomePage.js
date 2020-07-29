import React from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";


const HomePage = ({props}) => {
    console.log("your data in HomePage: ", props);
    return(
        <>
            <h1>Created</h1>
        </>
    )
}

export default HomePage;