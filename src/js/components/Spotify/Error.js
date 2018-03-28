import React from 'react';

class Error extends React.Component {
  
    constructor(props) {
        super();
        this.state = { error: props.error };
    }
    
    render() {
        const {error} = this.state;
        return (
            <div className="error-page container"> 
                <div className="display-2 boldest">{error.status}</div>
                <div className="display-3 boldest">{error.message}</div>

                <button className="btn btn-spotify" onClick={() => window.location.href='/login'} > Log in again</button>
            </div>
        );

    }
}

export default Error;
