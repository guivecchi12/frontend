import React, { useState } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import PrivateRoute from "./utilities/PrivateRoute";
import "./App.css";
import { UserContext } from "./context/UserContext";
import userStories from "./components/userStories";
import AddImage from "./components/addImage";

function App() {
  const [user, setUser] = useState([]);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Footer />
        <Route
          exact
          path="/"
          component={() => {
            window.location.href = "https://expatjournal2020.netlify.app/";
            return null;
          }}
        />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/protected" component={HomePage} />
        <PrivateRoute exact path="/addStory" component={userStories} />
        <PrivateRoute exact path="/addImages" component={AddImage} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
