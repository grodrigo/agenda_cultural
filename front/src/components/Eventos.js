import React, {Component} from 'react';
import axios from 'axios';
import EventoItem from './EventoItem';
import { API_URL } from './../constants';

class Eventos extends Component{
    constructor(){
        super();
        this.state = {
            eventos: []
        }
    }

    getEventos(){
        //promise then an arrow function
        axios.get(`${API_URL}/eventReviews`)
        .then(response => {
            this.setState({eventos: response.data}, () =>
            {})
        })
        .catch(error => console.log(error));
    }

    //called before mount and render component
    componentWillMount(){
        this.getEventos();
    }

    render(){
var eventoItems;
        if (this.state.eventos && this.state.eventos.length > 0){
            eventoItems = this.state.eventos.map((evento, i) => {
            return(
                    <EventoItem key={evento.id} item={evento} />
                )
            })
        }else{
            eventoItems = <h4>No hay eventos cargados :(</h4>;
        }

        return (
            <div>
                <h1>Eventos</h1>
                <div className="row" data-cy="eventoList">
                    {eventoItems}
                </div>
            </div>
        )
    }

}

export default Eventos;
