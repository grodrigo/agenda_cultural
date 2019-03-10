import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import Eventos from './Eventos';
import About from './About';
import EventoDetails from './EventoDetails';
import AddEvento from './AddEvento';
import EditEvento from './EditEvento';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import { Redirect } from "react-router-dom";
  //      <Route exact path='/eventos/add' component={AddEvento}/>

function isAuthenticated() {
    return localStorage.getItem('loggedIn');
}
class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props
    return (
      <Route 
        {...props} 
        render={props => (
          isAuthenticated() ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )} 
      />
    )
  }
}

// protected routes: one way by ProtectedRoute component and the other by just a conditional
const Main = () => (
  <main>
    <Switch>
        <Route exact path='/' component={Eventos}/>
        <Route exact path='/about' component={About}/>
        <ProtectedRoute path='/eventos/edit/:id' component={EditEvento} />
        { isAuthenticated() && 
            <Route exact path='/eventos/edit/:id' component={EventoDetails}/>
        }
        <ProtectedRoute path='/eventos/add' component={AddEvento} />
        <Route exact path='/eventos/:id' component={EventoDetails}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/logout' component={Logout}/>
    </Switch>
  </main>
)

export default Main;

//<Route exact path='/eventos/:id'  render={(props) => <EventoDetails  {...props} profile={this.props.profile} />  }/>