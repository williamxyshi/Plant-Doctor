import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SearchBar from "./components/search-bar-page.component";
import User from "./components/user.component";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  
          <Link to="/" className="navbar-brand">Plant Doctor</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/user" className="nav-link">User</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
        <Route path="/" exact component={SearchBar} />
        <Route path="/user" component={User} />
      </div>
    </Router>
      
    );
  }
}

export default App;
