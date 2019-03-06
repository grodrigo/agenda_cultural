import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AddEvento extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            date: "",
            place: "",
            picture: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        //console.log(target.value);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        let userId = JSON.parse(localStorage.getItem('jwtToken')).userId;
        userId = {"customUserId": userId };
        axios.request({
            method: 'post',
            url: 'http://localhost:3001/api/v1/eventReviews',
            data: { ...this.state, ...userId }
        }).then(response => {
            this.props.history.push('/');
        }).catch(error => console.log(error.response));
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <Link className="btn grey" to="/">Back</Link>
                <h1>Agregar Evento</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <input type="text" name="title" value={this.state.title} 
                            onChange={this.handleInputChange.bind(this)}/>
                            <label htmlFor="title">Título</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="description" value={this.state.description} 
                            onChange={this.handleInputChange.bind(this)}/>
                            <label htmlFor="description">Descripción</label>
                    </div>
                    <div className="input-field">
                        <input type="date" name="date"  value={this.state.date} 
                            onChange={this.handleInputChange.bind(this)} />
                        <label htmlFor="date">Fecha</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="place"  value={this.state.place} 
                            onChange={this.handleInputChange.bind(this)} />
                        <label htmlFor="place">Lugar</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="picture"  value={this.state.picture} 
                            onChange={this.handleInputChange.bind(this)} />
                        <label htmlFor="picture">Imágen (URL)</label>
                    </div>
                    <input type="submit" value="Guardar" className="btn" />
                </form>
            </div>
        )
    }
}

export default AddEvento;
