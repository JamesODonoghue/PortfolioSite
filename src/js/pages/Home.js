import React from 'react';

import Parallax from '../components/parallax';
import Navbar from '../components/Navbar';
import Section from '../components/Section';


export default class Home extends React.Component {

  componentDidMount() {

  }
  render() {
    return (
      <div>
        <div className="site-header">

          <div id="particles"></div>

          <div className="jumbotron">
            <h1> James O'Donoghue</h1>
            <h3> Javascript/HTML/CSS Developer </h3>
          </div>

          <div className="nav-section">
            <Navbar />
          </div>
        </div>
        <div className="resume container">
          <Section />
        </div>

      </div>
    );
  }
}
