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
                                Here are some sample projects
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <a href="/spotify">
                                <button className="button-spotify">
                                    <div className="card-body">
                                        <h4 className="card-title"> Spotify Playlist Analyzer</h4>
                                        <p className="card-text"> Spotify Client that analyzes playlists. This app uses ReactJS and a Spotify API wrapper -- spotify-web-api </p>
                                    </div>
                                </button>
                            </a>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <a href='http://next-bus-map.herokuapp.com/'>
                                <button className="button-muni-map">
                                    <div className="card-body">
                                        <h4 className="card-title"> SF Muni Map </h4>
                                        <p className="card-text"> NextBus Client that uses D3 and the NextBusAPI to draw real time locations of SF Muni buses </p>
                                    </div>
                                </button>
                            </a>
                           
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}