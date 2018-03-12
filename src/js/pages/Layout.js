import React from 'react';
import {Link, NavLink} from 'react-router-dom';


export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light navbar-color fixed-top">
            {/* <NavLink className="nav-link" to="/"> Home </NavLink>
            <div className="nav-item dropdown"> 
              <NavLink className="nav-link" to="/about"> About </NavLink>
              <div className="dropdown-content">
                <NavLink className="nav-link" to="/about/history"> Our History </NavLink>
                <NavLink className="nav-link" to="/"> Home </NavLink>
                <NavLink className="nav-link" to="/"> Home </NavLink>
              </div>
            </div>
            <NavLink className="nav-link" to="/sample"> Sample </NavLink> */}
            
           
        </nav>
        
        {this.props.children}
      </div>
    );
  }
}
