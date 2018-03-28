import React from 'react';
import queryString from 'query-string';
import _ from 'lodash';


import SpotifyWebApi from 'spotify-web-api-js';

import Modal from '../components/Modal';
import Playlists from '../components/Spotify/Playlists';
import Error from '../components/Spotify/Error';


// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : 'ceb9be711d7d46d8bdec35c613d38016'
});

export default class Spotify extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {},
            currentPlaylist: null,
            playlists: null,
            showModal: false,
            error: null
        };

    }
    componentDidMount() {
        this.parseAccessToken();
        this.getUserData();
        this.getPlaylistsAndTracks();
        // this.getMyTopTracks();
    }

    parseAccessToken() {

        let parsed = queryString.parse(location.search);
        let accessToken = parsed.access_token;

        return spotifyApi.setAccessToken(accessToken);

    }

    handleError = (error) => {
        // let response = JSON.parse(error.response || error.responseText || );

        this.setState({error: {status: error.status , message: error.statusText}});

    }

    getUserData () {

        spotifyApi.getMe()
            .then(data => {
                this.setState({user: { name: data.display_name, id: data.id, images: data.images, followers: data.followers.total}});
            }).catch(error => {
                this.handleError(error);
            });

    }

    getMyTopTracks() {

        spotifyApi.getMyTopTracks()
            .then(data => {
                console.log(data);
            }).catch(error => {
                this.handleError(error);
            });

    }
    getPlaylists() {
        return spotifyApi.getUserPlaylists();

    }

    getPlaylistsAndTracks() {

        var playlists = [];

        // Huge Promise chaining which chaings together many promises for upfront loading of all playlists/tracks/track metadata

        this.getPlaylists()
            .then(data => {
                playlists = data.items;
                return data.items;
                
            }).then(playlists => {
                console.log(playlists);
                let getAllTracks = (playlistArray) => {
                    return Promise.all(playlistArray.map(getPlaylistTracks));
                }
                let getPlaylistTracks = (playlist) => {
                    return spotifyApi.getGeneric(playlist.tracks.href);

                }
                return getAllTracks(playlists);
                
            }).then(data => {
                let promises = [];

                let getAllTrackFeatures = (tracksArray) => {
                    return Promise.all(tracksArray.map(getTrackFeatures));
                }
                let getTrackFeatures = (tracks) => {
                    let playListTrackIds = _.map(tracks, 'track.id'); 
                    promises.push(spotifyApi.getAudioFeaturesForTracks(playListTrackIds))
                }
            
                data.forEach((val, key) => {
                    playlists[key].tracks = val.items;
                    getTrackFeatures(playlists[key].tracks)
                });

                return Promise.all(promises);

                
            }).then(data => {
                data.forEach((val, key) => {
                    let sum = 0;
                    playlists[key].audio_features = val.audio_features;
                    playlists[key].danceTotal = val.audio_features.reduce((total, value) => {
                        return sum += value.danceability ;
                    });
                    playlists[key].energyTotal = val.audio_features.reduce((total, value) => {
                        return sum += value.energy ;
                    });
                    playlists[key].tempoTotal = val.audio_features.reduce((total, value) => {
                        return sum += value.tempo ;
                    });
                    playlists[key].danceAverage = (playlists[key].danceTotal / playlists[key].tracks.length) * 100;
                    playlists[key].energyAverage = (playlists[key].energyTotal / playlists[key].tracks.length) * 100;
                    playlists[key].tempoAverage = (playlists[key].tempoTotal / playlists[key].tracks.length);
                    
                });

                this.setState({playlists: playlists });

            });
    }

    getFeatures(playlist) {
        let playListTrackIds = [];

        playListTrackIds = _.map(playlist.tracks, 'track.id');

        return spotifyApi.getAudioFeaturesForTracks(playListTrackIds)
           
    }

    handleModalClose = () => {
        this.setState({showModal: false});
    }

    handlePlaylistClick = (playlist, e) => {
        
        let playlists = this.state.playlists;
        let currentPlaylist = _.find(playlists, {id: playlist.id});
        this.setState({currentPlaylist: currentPlaylist, showModal:true });

    }
    render() {

        const {showModal, playlists, currentPlaylist, user, audioFeatures, error} = this.state;

        const userImageUrl = user.images && user.images.length !== 0 ? user.images[0].url : null;

        let emptyPlaylists = (
            <div style={{height: '100%', width: '100%'}} className="display-2 boldest">
                You have no playlists you luddite.
            </div>
        );

        let playListTracks = currentPlaylist ? currentPlaylist.tracks.map((item) => 
            <li key={item.track.id} className="list-group-item rounded-0">
                {item.track.name}
            </li>

        ) : [];

        return (
            <div className="spotify-page">
                <div className="header container">
                    <div className="header-left display-3 boldest"> Playlist Analyzer </div>
                    <div className="row">
                        <div className="col text-center m-1"> 
                            <span className="badge badge-pink" > Dance </span>

                        </div>
                        <div className="col text-center m-1">
                            <span className="badge badge-success " > Energy </span>
                        
                        </div>
                        <div className="col text-center m-1">
                            <span className="badge badge-info" > Tempo</span>
                        
                        </div>
                    
                    </div>
                    <span className="boldest"> {user.name}</span>
                    <div className="boldest"> {user.followers} followers </div>
                    <span>
                        {userImageUrl ? <img className="user-image" src={user.images[0].url}></img> : ''}
                    </span>
                        
                </div>

                {error ? <Error error={error}/> :
     
                <div className="container">
                    <div className="dashboard">
                        <div className="row">
                        </div>
                    </div>

                    {playlists && playlists.length !== 0 ? 
                        <Playlists playlists={playlists} handleClick={this.handlePlaylistClick}/> :
                        playlists !== null ? emptyPlaylists : null
                    }

                    <Modal style={{}} onClose={this.handleModalClose} open={showModal}>
                        <h2>{currentPlaylist ? currentPlaylist.name : ''}</h2>
                        <ul className="list-group">
                            {playListTracks}
                        </ul>
                    
                    </Modal>
                </div>}
                    
            </div>

        )


  }
}
