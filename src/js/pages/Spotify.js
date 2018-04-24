import React from 'react';
import queryString from 'query-string';
import _ from 'lodash';


import SpotifyWebApi from 'spotify-web-api-js';

import Modal from '../components/Modal';
import Playlists from '../components/Spotify/Playlists';
import Error from '../components/Spotify/Error';
import Header from '../components/Spotify/Header';
import Login from '../components/Spotify/Login';

import AllTracks from '../components/Spotify/AllTracks';

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : 'ceb9be711d7d46d8bdec35c613d38016'
});

export default class Spotify extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null,
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
                // console.log(data);
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
                let getAllTracks = (playlistArray) => {
                    return Promise.all(playlistArray.map(getPlaylistTracks));
                }
                let getPlaylistTracks = (playlist) => {
                    return spotifyApi.getGeneric(playlist.tracks.href);

                }
                return getAllTracks(playlists);
                
            }).then(data => {

                let allTracks = [];

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

                this.setState({allTracks: allTracks});


                return Promise.all(promises);

                
            }).then(data => {

                let allTracks = [];
                
                data.forEach((val, key) => {
                    let sum = 0;

                    playlists[key].tracks.forEach((track, key) => {
                        track.audio_features = val.audio_features[key];
                        allTracks.push(track);

                    });

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


                this.setState({playlists: playlists, allTracks: allTracks });

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

        const {showModal, playlists, currentPlaylist, user, audioFeatures, error, progress, allTracks} = this.state;

        const EmptyPlaylists = () => {
            return (
                <div style={{height: '100%', width: '100%'}} className="display-2 boldest">
                    You have no playlists.
                </div>
            );
        }

        const Loading = () => {
            return (
                <div className="container display-2"> loading...</div>
            )
        }


        const PlaylistsToRender = () => {
            if(!playlists){
                return <Loading/>
            
            } else if(playlists && playlists.length === 0){
                return <EmptyPlaylists/>
            } else {
                return (
                    <Playlists playlists={playlists} handleClick={this.handlePlaylistClick}/>
                );
            }
        };



        let playListTracks = currentPlaylist ? currentPlaylist.tracks.map((item) => 
            <li key={item.track.id} className="list-group-item rounded-0">
                {item.track.name}
            </li>

        ) : [];

        return (
            <div className="spotify-page">

                <Login/>
                {user && user.name ?  <Header user={user}/> : null }

                <div className="container">
                    <div className="dashboard">
                        <div className="row">
                        </div>
                    </div>

                    { allTracks && allTracks.length > 0 ? <AllTracks tracks={allTracks}/> : []}

                    <PlaylistsToRender/>
                    <Modal style={{}} onClose={this.handleModalClose} open={showModal}>
                        <h2>{currentPlaylist ? currentPlaylist.name : ''}</h2>
                        <ul className="list-group">
                            {playListTracks}
                        </ul>
                    
                    </Modal>
                </div>
            
        
            </div>

        )


  }
}
