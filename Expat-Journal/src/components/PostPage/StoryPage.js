import React from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";
import Header from "../Header";
import Footer from "..Footer";

const HomePage = () => {
  const initialPost = {
    story_userId,
    story_Id: "",
    story_title: "",
    story_body: "",
  };

  return (
    <div className="homePage-container">
      <Header />
      <div className="post-page">
        <title>${}</title>
      </div>
      <Footer />
    </div>
  );
};
