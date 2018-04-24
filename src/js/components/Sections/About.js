import React from 'react';

export default class About extends React.Component{
    render() {
        return (
            <div className="row about">
                <div className="col-lg-6">
                    <div className="display-1">
                        about me
                    </div>
                    <p>
                        I'm a 25 year old software engineer from San Francisco. 
                        My favorite language is Javascript and I'm currenty learning/playing a lot with React. 
                        I also enjoy writing CSS with Sass. Mixins are great for creating resuable UI Elements! Like the buttons on this site!
                    </p>
                </div>

            </div>
        );
    }
}