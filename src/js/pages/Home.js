import React from 'react';

import Parallax from '../components/parallax';
import Navbar from '../components/Navbar';
import Section from '../components/Section';

import $ from 'jquery';

import Particles from 'react-particles-js';


const particlesConfig = require('Assets/particlesjs-config.json');

export default class Home extends React.Component {

  componentDidMount() {

  }
  render() {
    return (
      <div>
        {/* <Parallax class="main-header"/> */}
        <div className="container">

          {/* <Maps/> */}

          <Section />
          
        </div>

      </div>
     
    );
  }
}
