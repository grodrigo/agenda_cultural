import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Eventos from './Eventos';
import About from './About';
import EventoDetails from './EventoDetails';
import AddEvento from './AddEvento';
import EditEvento from './EditEvento';
import Login from './Login';
import Register from './Register';

const Main = () => (
  <main>
    <Switch>
        <Route exact path='/' component={Eventos}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/eventos/add' component={AddEvento}/>
        <Route exact path='/eventos/edit/:id' component={EditEvento}/>
        <Route exact path='/eventos/:id' component={EventoDetails}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
    </Switch>
  </main>
)

export default Main;