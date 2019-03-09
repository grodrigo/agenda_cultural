import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: '',
      currentItem: {
        text: '',
        key: '',
      },
    };
  }

  render() {
    let loggedIn = localStorage.getItem('loggedIn', loggedIn);
    let buttonAddEvent;
    if (loggedIn){
      buttonAddEvent = <div className="fixed-action-btn">
          <Link to="/eventos/add" className="btn-floating btn-large red">
            <i className="fa fa-plus"></i>
          </Link>
      </div>;
    }
    return (
      <div>
        <Navbar loggedIn={loggedIn}/>
        <div className="container">
          <Main />
        {buttonAddEvent}
        </div>
      </div>
    )
  }
}
export default App;

// const App = () => (
//   <div>
//     <Navbar />
//     <div className="container">
//       <Main />
//     </div>
//     <div className="fixed-action-btn">
//       <Link to="/eventos/add" className="btn-floating btn-large red">
//         <i className="fa fa-plus"></i>
//       </Link>
//     </div>
//   </div>
// )

// export default App;
