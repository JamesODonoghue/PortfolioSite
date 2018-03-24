import React from 'react';
import queryString from 'query-string';

import SpotifyWebApi from 'spotify-web-api-js';

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
            user: {}
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
                this.setState({user: { name: data.display_name, id: data.id}});
            }, function(err) {
                console.log('Something went wrong!', err);
            });

    }

    getPlaylists() {

        spotifyApi.getUserPlaylists()
        .then(data => {
            console.log(data);
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
                console.log(data);
                this.setState({filteredList: {
                    tracks: data.tracks ? data.tracks : null,
                    artists: data.artists ? data.artists: null
                }})
            });

        }


    }

    onChange(e) {
        this.setState({filterString: e.target.value});


    }

    handleModalClose() {
        this.setState({showModal: false});
    }

    handlePlaylistClick(playlist, e) {
        
        let playlists = this.state.playlists;


        let mapTracksToState = (data) => playlists.forEach((val, key) => {
            if(val.id === playlist.id){
                playlists[key].items = data.items;
                this.setState({playlists: playlists});
                this.setState({currentPlayList:this.state.playlists[key] });
                this.setState({showModal:true})
                
            }
        });

        spotifyApi.getPlaylistTracks(playlist.owner.id, playlist.id)
            .then(data => {
                console.log(data);
                mapTracksToState(data);
                // this.setState(...this.state, {playlists: playlist.id})
            })


    }
    render() {

        let playListTracks = this.state.currentPlayList ? this.state.currentPlayList.items.map((item) => 
            <li key={item.track.id} className="list-group-item rounded-0">
                {item.track.name}
            </li>

        ) : [];

        let filteredList = this.state.filteredList ? this.state.filteredList.tracks.items.map((track) => 
            <li key={track.id} className="list-group-item">
                {track.name}
            </li>
        ) : [];


        let userPlaylists = this.state.playlists ? this.state.playlists.map((playlist) => 
                <div key={playlist.id} onClick={(e) => this.handlePlaylistClick(playlist, e) } className="card spotify bold">
                    <img className="card-img-top" src={playlist.images ? playlist.images[0].url: '...'}></img>
                    <div className="card-body">
                        <div className="card-title">
                            {playlist.name}
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
        ) : [];

        return (
            <div className="spotify-page">
                <div className="container display-1 text-center">
                    {this.state.user.name}
                </div>

                <div className="my-container">


                    {/* <ul className="list-group" style={{maxHeight: '250px', overflow: 'auto'}}>
                        {filteredList}
                    </ul> */}

                    <div className="row">
                        {userPlaylists}
                    </div>

                    {this.state.showModal ? (
                         <div className="my-modal ">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2>{this.state.currentPlayList ? this.state.currentPlayList.name : ''}</h2>
                                    <span onClick={() => this.handleModalClose()} className="close">&times;</span>
                                    
                                </div>
                                {/* <div className="input-group input-group-lg">
                                    <input type="text" className="form-control" aria-label="Search Tracks" aria-describedby="inputGroup-sizing-sm" placeholder="Filter Playlists"
                                    onChange={this.onChange.bind(this)} onKeyDown={this.search.bind(this)}></input>
                                </div> */}
                                <div className="modal-body">
                                <ul className="list-group ">
                                    {playListTracks}
                                </ul>
                                </div>
                            </div>
                        </div>
                    ) : ''}
  
                </div>
              
            </div>

        )


  }
}
