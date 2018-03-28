import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playlists: props.playlists};
  }

  render() {

    const {playlists} = this.state;

    let userPlaylists = playlists.map((playlist) => 
        <div key={playlist.id} onClick={(e) => this.props.handleClick(playlist, e) } className="card spotify">
            <img className="card-img-top" src={playlist.images && playlist.images[0] ? playlist.images[0].url: '...'}></img>
            <div className="card-body">
                <h5 className="card-title boldest">
                    {playlist.name}
                </h5>
                <p className="cart-text"> Some sample data about this playlist</p>
            </div>
        </div>
    );

    return (
        <div className="row">
            {userPlaylists}
        </div>
    );
  }
}

export default Playlists;
