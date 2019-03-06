import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class EventoItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            item:props.item
        };
        if(!this.state.item.picture){
            this.state.item.picture = "https://i0.wp.com/www.laarena.com.ar/__uP_Load_/2018/09/fiesta62fca452.jpg?fit=793%2C529";
        }
    }

    render(){
        return(
        <div className="col s4">
            <div className="card small">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={this.state.item.picture}/>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{this.state.item.title}<i className="material-icons right">+</i></span>
                  <p><Link to={`/eventos/${this.state.item.id}`}>
                    Detalles</Link></p>
                  <p>{this.state.item.place}</p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">{this.state.item.title}<i className="material-icons right">close</i></span>
                  <p>{this.state.item.content}</p>
                  <p>{this.state.item.place}</p>
                </div>
            </div>
        </div>
        )
    }
}

export default EventoItem;

