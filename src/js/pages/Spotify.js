import React from 'react';
import queryString from 'query-string';

import SpotifyWebApi from 'spotify-web-api-js';

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : 'ceb9be711d7d46d8bdec35c613d38016'
});


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
                console.log(data);
                this.setState({user: { name: data.display_name}});
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
            name: item.name,
            songs: [],
            images: item.images
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

        console.log(this.state.filterString);

    }
    render() {

        let filteredList = this.state.filteredList ? this.state.filteredList.tracks.items.map((track) => 
            <li key={track.id} className="list-group-item">
                {track.name}
            </li>
        ) : [];


        let userPlaylists = this.state.playlists ? this.state.playlists.map((playlist) => 
                <div key={playlist.id} className="card col-sm-3">
                    <img className="card-img-top" src={playlist.images ? playlist.images[0].url: '...'}></img>
                    <div className="card-body">
                        <div className="card-title">
                            {playlist.name}
                        </div>
                    </div>
                </div>
        ) : [];

        return (
            <div className="spotify-page container">
                <div className="display-1">
                    {this.state.user.name}
                </div>

                <div className="container">
                    <div className="input-group input-group-lg">
                        <input type="text" className="form-control" aria-label="Search Playlists" aria-describedby="inputGroup-sizing-sm" placeholder="Filter Playlists"
                        onChange={this.onChange.bind(this)} onKeyDown={this.search.bind(this)}></input>
                    </div>

                    <ul className="list-group" style={{maxHeight: '250px', overflow: 'auto'}}>
                        {filteredList}
                    </ul>

                    <div className="row">
                        {userPlaylists}
                    </div>
                </div>
            </div>

        )


  }
}
