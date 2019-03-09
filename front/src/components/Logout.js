import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentWillMount() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn){
      localStorage.clear();
    }
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }

}

export default Logout;
