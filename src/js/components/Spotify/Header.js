import React from 'react';

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = { user: props.user };

    }
    render() {

        const { user } = this.state;

        const userImageUrl = user.images && user.images.length !== 0 ? user.images[0].url : null;
        
        return (
            <div className="header">
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

        );
    }
}
