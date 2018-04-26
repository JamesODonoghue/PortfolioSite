import React, { Component } from 'react';

class Login extends Component {
  render() { 
    return ( 
      <div className="container">
         <div className="row">
            <div className="col">
                <div className="display-3">
                  Welcome to my Spotify Client!
                </div>
                <button className="button-spotify" onClick={()=> window.location.href = '/login'}>
                  Log in to Spotify
                </button>
            </div>
        </div>
      </div>
    )
  }
}
 
export default Login;
