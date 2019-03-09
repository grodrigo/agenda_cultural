import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from './../constants';

class EventoDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            owner:''
        };
//        this.getOwner(this.props.match.params.ownerId);
    }

    componentWillMount() {
        this.getEvento();
    }

    getOwner(ownerId) {
        return axios.get(`${API_URL}/customUsers/${ownerId}`)
        .then(response => {
          this.setState({ owner: response.data }, () => {
          });
        })
        .catch(error => console.log(error));
    };

    getEvento() {
        let eventoId = this.props.match.params.id;
        axios.get(`${API_URL}/eventReviews/${eventoId}`)
        .then(response => {
            this.setState({ item: response.data }, () => {
            })
        })
        .catch(error => console.log(error));
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax
        // let change = { [e.target.name] = e.target.value }
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    onDelete(){
        let eventoId = this.state.item.id;
        axios.delete(`${API_URL}/eventReviews/${eventoId}`)
        .then(response =>  {
            this.props.history.push('/');
        }).catch(error => console.log(error));
    }

    render() {
        const isMyItem = JSON.parse(localStorage.getItem('profile')).userId == this.state.item.owner;
        let editButton;
        let deleteButton;
        if(isMyItem){
            editButton = <Link className="btn" to={`/eventos/edit/${this.state.item.id}`}>Editar</Link>;
            deleteButton = <button onClick={this.onDelete.bind(this)} className="btn red right">Borrar</button>;
        }

        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return (
            <div>
                <Link className="btn grey" to="/">Back</Link>
                <h1>{this.state.item.title}</h1>
                <img src={this.state.item.picture}/>
                <p>{this.state.item.description}</p>
                <ul className="collection">
                    <li className="collection-item">Fecha: {
                        (new Date(this.state.item.date)).toLocaleDateString('es-AR', DATE_OPTIONS)}
                    </li>
                    <li className="collection-item">Lugar:{this.state.item.place}</li>
                </ul>
                { editButton }
                { deleteButton }
            </div>
        )
    }
}

export default EventoDetails;
