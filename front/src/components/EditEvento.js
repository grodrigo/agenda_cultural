import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { API_URL } from './../constants';

class EditEvento extends Component{

  constructor(props){
    super(props);
    this.state = {
      id:'',
      title:'',
      description:'',
      date:'',
      place:'',
      picture:'',
      customUserId: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getEventoDetails();
  }

  getEventoDetails(){
    let eventoId = this.props.match.params.id;
    axios.get(`${API_URL}/eventReviews/${eventoId}`)
    .then(response => {
      console.log(response.data);
      this.setState({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        date: response.data.date.substr(0, 10),
        place: response.data.place,
        picture: response.data.picture,
        customUserId: response.data.customUserId
      }, () => {
        //console.log(this.state); // onLoad
      });
    })
    .catch(err => console.log(err));
    }

  EditEvento(newEvento){
    axios.request({
      method:'put',
      url:`${API_URL}/eventReviews/${this.state.id}`,
      data: newEvento
    }).then(response => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    const newEvento = {
      title: this.refs.title.value,
      description: this.refs.description.value,
      date: this.refs.date.value,
      place: this.refs.place.value,
      picture: this.refs.picture.value
    }
    this.EditEvento(newEvento);
    e.preventDefault();
  }

  handleInputChange(e){
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    return (
     <div>
        <br />
       <Link className="btn grey" to="/">Back</Link>
       <h1>Editar Evento</h1>
       <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <label htmlFor="title">Título</label>
            <input type="text" name="title" ref="title" value={this.state.title} onChange={this.handleInputChange.bind(this)} />
          </div>
          <div className="input-field">
            <label htmlFor="description">Descripción</label>
            <input type="text" name="description" ref="description" value={this.state.description} onChange={this.handleInputChange.bind(this)} />
          </div>
          <div className="input-field">
            <label htmlFor="date">date</label>
            <input type="date" name="date" ref="date" value={this.state.date} onChange={this.handleInputChange.bind(this)} />
          </div>
          <div className="input-field">
            <label htmlFor="place">place</label>
            <input type="text" name="place" ref="place" value={this.state.place} onChange={this.handleInputChange.bind(this)} />
          </div>
          <div className="input-field">
            <label htmlFor="picture">picture</label>
            <input type="text" name="picture" ref="picture" value={this.state.picture} onChange={this.handleInputChange.bind(this)} />
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default EditEvento;



