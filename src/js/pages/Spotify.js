import React from 'react';
import queryString from 'query-string';
import _ from 'lodash';


import SpotifyWebApi from 'spotify-web-api-js';

import Modal from '../components/Modal';
import Playlists from '../components/Spotify/Playlists';

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : 'ceb9be711d7d46d8bdec35c613d38016'
});

export default class Spotify extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {},
            currentPlayList: null,
            playlists: null,
            showModal: false
        };

    }
    componentDidMount() {
        this.parseAccessToken();
        this.getUserData();
        this.getPlaylists();
    }

    parseAccessToken() {

        let parsed = queryString.parse(location.search);
        let accessToken = parsed.access_token;

        spotifyApi.setAccessToken(accessToken);

    }

    getUserData () {

        spotifyApi.getMe()
            .then(data => {
                this.setState({user: { name: data.display_name, id: data.id, images: data.images, followers: data.followers.total}});
            }, function(err) {
                console.log('Something went wrong!', err);
            });

    }

    getPlaylists() {

        spotifyApi.getUserPlaylists()
        .then(data => {
            // console.log(data);
            this.setState({ playlists: this.mapPlaylists(data)});

        }, function(err) {
            console.log('Something went wrong!', err);
        });

    }

    mapPlaylists(data){
        
        return data.items.map(item => ({
            id: item.id,
            name: item.name,
            songs: item.tracks,
            images: item.images,
            owner: item.owner
        }))
    }

    search(e) {

        var query = this.state.filterString ? this.state.filterString : null;
        var types = ['track', 'artist'];

        if(query){
            spotifyApi.search(query, types)
            .then(data => {
                // console.log(data);
                this.setState({filteredList: {
                    tracks: data.tracks ? data.tracks : null,
                    artists: data.artists ? data.artists: null
                }})
            });

        }


    }

    getFeatures(playlist) {

        console.log(playlist);
        let playListTrackIds = [];

        playListTrackIds = _.map(playlist.items, 'track.id');

        // console.log(playListTrackIds)
        spotifyApi.getAudioFeaturesForTracks(playListTrackIds)
            .then(data => {
                console.log(data);
                this.setState(...this.state, {audioFeatures: data.audio_features})

                console.log(this.state);
            })
    }

    handleModalClose = () => {
        this.setState({showModal: false});
    }

    handlePlaylistClick = (playlist, e) => {
        
        let playlists = this.state.playlists;

        let mapTracksToState = (data) => playlists.forEach((val, key) => {
            if(val.id === playlist.id){
                playlists[key].items = data.items;
                this.setState({playlists: playlists, currentPlayList:this.state.playlists[key], showModal:true });
                this.getFeatures(this.state.currentPlayList);
                
            }
        });

        spotifyApi.getPlaylistTracks(playlist.owner.id, playlist.id)
            .then(data => {
                mapTracksToState(data);
            })


    }
    render() {

        const {showModal, playlists, currentPlayList, user, audioFeatures} = this.state;

        const userImageUrl = user.images && user.images.length !== 0 ? user.images[0].url : null;

        let emptyPlaylists = (
            <div style={{height: '100%', width: '100%'}} className="display-2 boldest">
                You have no playlists you luddite.
            </div>
        );

        let playListTracks = currentPlayList ? currentPlayList.items.map((item) => 
            <li key={item.track.id} className="list-group-item rounded-0">
                {item.track.name}
            </li>

        ) : [];

        return (
            <div className="spotify-page">
                <div className="header container">
                    <div className="header-left display-3 boldest"> Playlist Analyzer </div>
                    <div className="boldest"> {user.name}</div>
                    <div className="boldest"> {user.followers} followers </div>
                    <span>
                        {userImageUrl ? <img className="user-image" src={user.images[0].url}></img> : ''}
                    </span>
                        
                </div>
     
                <div className="container">
                    <div className="dashboard">
                        <div className="row">
                        </div>

                    </div>

                    {playlists && playlists.length !== 0 ? 
                        <Playlists playlists={playlists} handleClick={this.handlePlaylistClick}/> :
                        playlists !== null ? emptyPlaylists : null
                    }

                    <Modal onClose={this.handleModalClose} open={showModal}>
                        <h2>{currentPlayList ? currentPlayList.name : ''}</h2>
                        <ul className="list-group">
                            {playListTracks}
                        </ul>
                    
                    </Modal>
                </div>
                    
            </div>

        )


  }
}
