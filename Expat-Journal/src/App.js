import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import PrivateRoute from "./utilities/PrivateRoute";
import "./App.css";
import ImagesList from "./components/ImagesList";
import ImagesInfo from "./components/ImagesInfo";
import ImgGit from "./components/ImgGit";
import { UserContext } from "./context/UserContext";

function App() {
  const [user, setUser] = useState([]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/images">
          <ImagesList />
        </Route>
        <Route path="/images/:id">
          <ImagesInfo />
        </Route>
        <Footer />
        {/* <Route exact path="/" component={Login} /> */}
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/protected" component={HomePage} />
        <PrivateRoute exact path="/images" component={ImgGit} />
      </div>
    </Router>
  );
}

export default App;
