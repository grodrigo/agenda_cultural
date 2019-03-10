import React, {Component} from 'react';
import { Link } from 'react-router-dom';

function LoginButton(props) {
//one way to do, if something like: false -> display login is needed
//other way is to do it like logoutButton above.
  return (
    <li><Link data-cy="loginLink" className="nav-link" to="/login">Login</Link></li>
  );
}

class Navbar extends Component{

    render(){
        const loggedIn = this.props.loggedIn;
        const profile = this.props.profile? this.props.profile :{};
        let logoutButton;
//        let loginButton;
        let singupButton;
        if(loggedIn){
            logoutButton = <li><Link data-cy="logoutLink" className="nav-link" to="/logout">Log Out</Link></li>;
        }else{
//            loginButton = <li><Link className="nav-link" to="/login">Login</Link></li>;
            singupButton = <li><Link data-cy="regitsterLink" className="nav-link" to="/register">Sign Up</Link></li>;
        }

        return (
            <div>
                <nav className="blue darken-3" data-cy="navbar">
                    <div className="nav-wrapper">
                        <a data-cy="homeLink" href="/" className="brand-logo">Agenda Cultural</a>
                        <div data-target="main-menu" className="sidenav-trigger waves-effect waves-light">
                            <i className="fa fa-bars"></i>
                        </div>
                        <ul className="right hide-on-med-and-down">
                            <li><Link data-cy="|homeLink" to="/"><i className="fa fa-users"></i>Eventos</Link></li>
                            <li><Link data-cy="addLink" to="/eventos/add"><i className="fa fa-plus"></i>Agregar Evento</Link></li>
                            <li><Link data-cy="aboutLink" to="/About"><i className="fa fa-question-circle"></i>About</Link></li>
                            { !loggedIn && <LoginButton /> }
                            {logoutButton}
                            {singupButton}
                            <li data-cy="profileName"> {profile.name}</li>
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="main-menu">
                    <li><Link data-cy="homeLink" to="/"><i className="fa fa-users"></i>Eventos</Link></li>
                    <li><Link data-cy="addLink" to="/eventos/add"><i className="fa fa-plus"></i>Agregar Evento</Link></li>
                    <li><Link data-cy="aboutLink" to="/About"><i className="fa fa-question-circle"></i>About</Link></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;
