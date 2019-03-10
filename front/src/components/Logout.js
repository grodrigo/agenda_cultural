import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import setAuthToken from '../setAuthToken';

class Logout extends Component {
  componentWillMount() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn){
      localStorage.clear();
      setAuthToken();
    }
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }

}

export default Logout;
