/*
admin@mydomain.com
password
*/
import React, { Component } from 'react';
import { API_URL } from './../constants';
import axios from 'axios';
import setAuthToken from '../setAuthToken';
//import jwt_decode from 'jwt-decode';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    axios.request({
      method:'POST',
      url:`${API_URL}/customUsers/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(this.state)
    }).then(res => {
      if (res.status === 200) {
        // its not a jwtoken but an array //look better ways
        const token = JSON.stringify(res.data);
        localStorage.setItem('jwtToken', token);
        let a = localStorage.getItem('jwtToken');
        setAuthToken(token);
        //const decoded = jwt_decode(token);
        //dispatch(setCurrentUser(decoded));
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login Below!</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}