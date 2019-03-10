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

  getProfile() {
    let userId = JSON.parse(localStorage.getItem('jwtToken')).userId;
    return axios.get(`${API_URL}/customUsers/${userId}`)
    .then(response => {
        localStorage.setItem('profile', response.data);
        //this.setState({ item: response.data }, () => {})
        //returning the promise
      return response.data;
    })
    .catch(error => console.log(error));
  }

  onSubmit = (event) => {
    event.preventDefault();
    axios.request({
      method:'POST',
      url:`${API_URL}/customUsers/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: this.state
    }).then(res => {
      if(res.status===200) {
        // its not a jwtoken but an array //look better ways
        const token = JSON.stringify(res.data);
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        this.getProfile().then(data => {
          localStorage.setItem('profile', JSON.stringify(data));
        });
        localStorage.setItem('loggedIn', true);
        //let a = localStorage.getItem('jwtToken');
        //const decoded = jwt_decode(token);
        //dispatch(setCurrentUser(decoded));
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
         <span id="login_failed"></span>
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