import React from 'react';
import {Link, NavLink} from 'react-router-dom';


export default class Layout extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
