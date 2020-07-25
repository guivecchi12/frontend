import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from "./components/Login";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PrivateRoute from './utilities/PrivateRoute';
import './App.css';
import UserList from './components/UserList';
import UserInfo from './components/UserInfo'

function App() {
  
    return (
      
      <Router>
        <div className="App">
        <Header />
        <Route exact path="/login">
          <Login />
        </ Route> 
        <Route exact path="/users">
          <UserList />
        </ Route> 
        <Route  path="/users/:id">
          <UserInfo />
        </ Route> 
        <Footer />
          {/* <Route exact path="/" component={Login} /> */}
          {/* <Route exact path="/signup" component = {signup} /> */}
          <PrivateRoute exact path="/protected" component={HomePage} />
        </div>
      </Router>
    );
  }

export default App;
