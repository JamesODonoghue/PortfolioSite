import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css'

const fields = {
    name: 'Name',
    artist: 'Artist',
    tempo: 'Tempo',
    energy: 'Energy',
    time_signature: 'Time Signature',
    danceability: 'Danceability'
};

class AllTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracks: props.tracks };
  }

    render() {

        
        const data = this.state.tracks;  

        console.log(data);
        
        
        const columns = [{
            Header: fields.name,
            accessor: 'track.name'
          },
          {
            Header: fields.artist,
            accessor: 'track.artists[0].name'
          },
          {
            Header: fields.tempo,
            accessor: 'audio_features.tempo',
            className: 'number',
            Cell: props => <span>{props.value.toFixed(0)}</span>
          },
          {
            Header: fields.time_signature,
            className: 'number',
            accessor: 'audio_features.time_signature',
          },
          {
            Header: fields.energy,
            className: 'number',
            accessor: 'audio_features.energy',
            Cell: props => (props.value * 100).toFixed(2)
          },
          {
            Header: fields.danceability,
            className: 'number',
            accessor: 'audio_features.danceability',
            Cell: props => (props.value * 100).toFixed(2)
          }
        ];
    
        return (
            <div>
                <div className="display-4"> All Playlist Tracks </div>

                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={20}
                    style={{
                      height: "600px"
                    }}
                />
            </div>
        )
  }

}

export default AllTracks;
