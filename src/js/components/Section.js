import React from 'react';
import $ from 'jquery';

export default class Section extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            skills: [
                { key: 'html5', name: 'HTML5', value: '100%'},
                { key: 'javascript', name: 'JavaScript', value: '90%'},
                { key: 'css', name: 'CSS', value: '80%'},
                { key: 'knockout', name: 'Knockout', value: '80%'},
                { key: 'jquery', name: 'JQuery', value: '70%'}
                
                
                
            ]
        }
    }

    render() {

        let skills = this.state.skills.map((skill) => {

            let barStyle = {
                width: skill.value
            };
            return (
                <div className="skill" key={skill.key} id={skill.key}>
                    <h4>{skill.name}</h4>
                    <div className="progress">
                        <div className="progress-bar bg-info" role="progressbar" style={barStyle} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <div className="section row" id="experience">
                    <div className="section-title col-3">
                        <h3>Experience</h3>
                    
                    </div>
                    <div className="section-content col-6">
                        <h4> Software Engineer</h4>
                        <p> Advent Software </p>
                        <p>
                            Use Agile Scrum to track tasks, create stories, deliver business features. 

                        </p>
                        <p>
                            Create generic, reusable UI components that communicated through pubsub. 

                        </p>
                        <p>
                            Write UI tests using NightwatchJS, as well as unit tests for generic components using Jasmine.  

                        </p>
                        <p>
                            Collaborate with the UX team to deliver a clean styled front end for our application powered by

                        </p>
                        <p>
                            Format and automate Jenkins logs using Splunk (allowed for robust queries on info/errors/warnings).  
                        </p>
                    </div>
                    <div className="section-content col-3">
                        <h4><span className="badge badge-primary badge-pink">2014-Current</span></h4>
                    </div>
                </div>
                <div className="section row" id="skills">
                    <div className="section-title col-3">
                        <h3>Skills</h3>
                    
                    </div>
                    <div className="section-content col-6">
                        {skills}
                    </div>
                    <div className="section-content col-3"></div>
                </div>
                <div className="section row" id="education">
                    <div className="section-title col-3">
                        <h3> Education </h3>
                    </div>
                    <div className="section-content col-6">
                        <h4> Computer Science, Bachelor of Science</h4>
                        <p> Seattle University </p>
                    </div>
                    <div className="section-content col-3">
                        <h4><span className="badge badge-primary badge-pink">2010-2014</span></h4>
                    </div>
                </div>
                <div className="section row" id="contact">
                    <div className="section-title col-3">
                        <h3>Contact</h3>
                    </div>
                    <div className="section-content col-6">
                        <h4>jodonogh1@gmail.com</h4>
                    </div>
                    <div className="section-content col-3"></div>
                </div>
            </div>
        );
    }
}