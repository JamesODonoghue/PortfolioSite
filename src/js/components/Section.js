import React from 'react';
import $ from 'jquery';

import About from './Sections/About';
import Landing from './Sections/Landing';

export default class Section extends React.Component {

    constructor(props){

        super(props);
    }

    render() {

        return (
            <div>
                <div className="section">
                    <Landing/>
                </div>
                <div className="section">
                    <About/>
                </div>
                
                <div className="section">
                    <div className="row">
                        <div className="col">
                            <div className="display-1">
                                Here is a sample project 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className="button-spotify" onClick={() => window.location.href='/spotify'}>
                                    <div className="card-body">
                                        <h4 className="card-title"> Spotify Playlist Analyzer</h4>
                                        <p className="card-text"> Spotify Client that analyzes playlists. This app uses ReactJS and a Spotify API wrapper -- spotify-web-api </p>

                                    </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}