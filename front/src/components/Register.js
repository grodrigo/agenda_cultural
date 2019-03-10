// Register.js

import React, { Component } from 'react';
import { API_URL } from './../constants';
import axios from 'axios';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        axios.request({
          method:'POST',
          url:`${API_URL}/customUsers`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(this.state)
        }).then(res => {
          if (res.status === 200) {
            // its not a jwtoken but an array //look better ways
            console.log = JSON.stringify(res.data);
            this.props.history.push('/login');
          } else {
            const error = new Error(res.error);
            console.log(error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert('Error in signup please try again');
        });
    }

    render() {
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    required
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                </div>
                <div className="form-group">
                    <input
                    required
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                </div>
                <div className="form-group">
                    <input
                    required
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                </div>
                <div className="form-group">
                    <input
                    required
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    value={ this.state.password_confirm }
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register User
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

export default Register;