import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import PrivateRoute from './utilities/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Route exact path="/" component={Login} /> */}
        {/* <Route exact path="/signup" component = {signup} /> */}
        <PrivateRoute exact path="/protected" component={HomePage} />
      </div>
    </Router>
  );
}

export default App;
