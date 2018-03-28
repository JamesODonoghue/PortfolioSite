import React from 'react';
import queryString from 'query-string';
import _ from 'lodash';


import SpotifyWebApi from 'spotify-web-api-js';

import Modal from '../components/Modal';

// import 'react-responsive-modal/lib/react-responsive-modal.css';
// import Modal from 'react-responsive-modal/lib/css';

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : 'ceb9be711d7d46d8bdec35c613d38016'
});

const TracksModal = ({onClose, playListTracks}) => (
    <div className="my-modal">
        <div className="modal-content">
            <div className="modal-header">
                <h2>Modal Header</h2>
                <span onClick={onClose} className="close">&times;</span>
                
            </div>
            <div className="modal-body">
            <ul className="list-group">
                {playListTracks}
            </ul>
            </div>
            <div className="modal-footer">
                <h3>Modal Footer</h3>
            </div>
        </div>
    </div>

);

class PlaylistTracks extends React.Component {

    render(){

        return (
            <div className="my-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2>Modal Header</h2>
                    </div>
                    <div className="modal-body">
                       <ul className="list-group">
                            {playListTracks}
                       </ul>
                    </div>
                    <div className="modal-footer">
                        <h3>Modal Footer</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default class Spotify extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {},
            currentPlayList: null,
            playlists: [],
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
                // console.log(data);
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

        // console.log(data);
        
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

    onChange(e) {
        this.setState({filterString: e.target.value});


    }

    handleModalClose = () => {
        this.setState({showModal: false});
    }

    handlePlaylistClick(playlist, e) {
        
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
                // console.log(data);
                mapTracksToState(data);
                // this.setState(...this.state, {playlists: playlist.id})
            })


    }
    render() {

        const {showModal, currentPlayList, user, audioFeatures} = this.state;

        let playListTracks = currentPlayList ? currentPlayList.items.map((item) => 
            <li key={item.track.id} className="list-group-item rounded-0">
                {item.track.name}
            </li>

        ) : [];

        // let filteredList = this.state.filteredList ? this.state.filteredList.tracks.items.map((track) => 
        //     <li key={track.id} className="list-group-item">
        //         {track.name}
        //     </li>
        // ) : [];


        let userPlaylists = this.state.playlists ? this.state.playlists.map((playlist) => 
            <div key={playlist.id} onClick={(e) => this.handlePlaylistClick(playlist, e) } className="card spotify bold">
                <img className="card-img-top" src={playlist.images && playlist.images[0] ? playlist.images[0].url: '...'}></img>
                <div className="card-body">
                    <h5 className="card-title boldest">
                        {playlist.name}
                    </h5>
                    <p className="cart-text"> Some sample data about this playlist</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted"></small>
                </div>
            </div>
        ) : [];


        return (
            <div className="spotify-page">
                <div className="header">
                    <div className="header-left display-3 boldest"> Playlist Analyzer </div>
                    <div className="header-right">
                        <div className="boldest"> {user.name}</div>
                        <div className="boldest"> {user.followers} followers </div>
                        <span>
                            <img className="user-image" src={user.images && user.images[0] ? user.images[0].url : ''}></img>
                        </span>
                        
                    </div>


                    
     
                </div>

                <div className="my-container">
                    <div className="dashboard">
                        <div className="row">
                            {/* <div className="card spotify no-hover">
                                <div className="card-body">{audioFeatures ? audioFeatures.length : null}</div>
                            </div>
                             */}
                            {/* <button className="btn my-button"> This is a sample button</button> */}
                            {/* <div className="col-sm">
                            <button className="btn my-button"> This is a sample button</button>
                            </div>
                            <div className="col-sm">
                            <button className="btn my-button"> This is a sample button</button>
                            </div> */}
                        </div>

                    </div>


                    {/* <ul className="list-group" style={{maxHeight: '250px', overflow: 'auto'}}>
                        {filteredList}
                    </ul> */}

                    <div className="row">
                        {userPlaylists}
                    </div>

                    <Modal style={{}} onClose={this.handleModalClose} open={showModal}>
                        <h2>{currentPlayList ? currentPlayList.name : ''}</h2>
                        <ul className="list-group ">
                            {playListTracks}
                        </ul>
                    
                    </Modal>
                
                    {/* <Modal classNames={{overlay: 'my-modal'}} open={showModal} onClose={this.handleModalClose}>
                        <h2>{currentPlayList ? currentPlayList.name : ''}</h2>
                        <ul className="list-group ">
                            {playListTracks}
                        </ul>
                    
                    </Modal> */}
                </div>
                    
            </div>

        )


  }
}
