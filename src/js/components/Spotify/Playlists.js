import React from 'react';

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
                <h5 className="card-title">
                    {playlist.name}
                </h5>
                <div className="row">
                    <div className="col text-center m-1"> 
                        <span className="badge badge-pink" >{playlist.danceAverage.toFixed(0)}</span>

                    </div>
                    <div className="col text-center m-1">
                        <span className="badge badge-success " >{playlist.energyAverage.toFixed(0)}</span>
                    
                    </div>
                    <div className="col text-center m-1">
                        <span className="badge badge-info" >{playlist.tempoAverage.toFixed(0)}</span>
                    
                    </div>
                </div>
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
