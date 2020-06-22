import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SearchBar from "./components/search-bar-page.component";
import User from "./components/user.component";

class App extends Component {


  
  render() {

    let styles = {
      navBarContainer: {
        top: 0,
        left: 0,
        position: "absolute",
        height: "15%",
        width: '100%',
        background: "#84A98C",
        elevation: 5,

        alignItems: 'center',
        display: 'flex',
  
        justifyContent: 'center',
      },
      headerText: {
        color: "#2F3E46",

      

      },

      background: {
        background: "#84A98C",
        height: "85%",
        width: "100%",
      
        position: "absolute",
        bottom: 0,
        left: 0
      },


      router: {
        height: "100%",
        width: "100%",
      
        position: "absolute",
        bottom: 0,
        left: 0

      }


    }

    return (

      <Router style={styles.router}>
        <div style={styles.navBarContainer}>
        <h1 style = {styles.headerText}>Plant Doctor</h1>



        </div>
      <div style={styles.background}>
      

        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
  
          <Link to="/" className="navbar-brand">Plant Doctor</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/user" className="nav-link">User</Link>
              </li>
            </ul>
          </div>
        </nav> */}
        <br/>
        <Route path="/" exact component={SearchBar} />
        <Route path="/user" component={User} />
      </div>
    </Router>
   
      
    );
  }
}

export default App;
