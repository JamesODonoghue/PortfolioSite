import React from 'react';

export default class Landing extends React.Component{
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <div className="display-1">
                            <div>Hello</div> 
                            <div>I'm James</div>
                        </div>
                        <h3>
                            I like to write software.
                        </h3>

                    </div>

                </div>

                <div className="row justify-content-center">
                    <button className="button-resume" onClick={()=> window.location.href = '/assets/james.pdf'}>
                        Download Resume
                    </button>
                    <div className="icon icon-github" onClick={() => window.location.href='https://github.com/JamesODonoghue'}></div>
                    <div className="icon icon-linkedin" onClick={() => window.location.href='http://www.linkedin.com/in/JamesODonoghue-92327555'}></div>

                </div>
            </div>
        );
    }
}