import React from 'react';
import $ from 'jquery';

export default class Section extends React.Component {

    constructor(props){

        super(props);
    }

    render() {

        return (
            <div>
                <div className="section">
                    <div className="row text-center">
                        <div className="col">
                            <div className="display-1">
                                <div>Hello</div> 
                                <div>I'm James</div>
                            </div>
                            <h3>
                                I like to write software.
                            </h3>
                            <button className="button-resume" onClick={()=> window.location.href = '/assets/james.pdf'}>
                                Download Resume
                            </button>
                        </div>


                    
                    </div>
                    <br></br>
                    <div className="row justify-content-center">
                        <div className="icon icon-github" onClick={() => {window.location.href='https://github.com/JamesODonoghue'}}></div>
                        <div className="icon icon-linkedin" onClick={() => {window.location.href='http://www.linkedin.com/in/JamesODonoghue-92327555'}}></div>
                        
                    </div>
                </div>
                {/* <div className="section">
                    <div className="row">
                        <div className="col">
                            <div className="display-1">
                                Here are some projects  
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>
                                Spotify Client that analyzes playlists.
                            </h3>
                            <button className="button-spotify">
                                Login
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}