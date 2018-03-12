import React from 'react';

import $ from 'jquery';


export default class Section extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            sections: [
                {
                    id: "education",
                    title: 'Education',
                    content: 
                        <div>
                            <div className="label bold">
                                B.S. Computer Science
                            </div>
                            <div className="">
                                Seattle University
                            </div>  
                            <div>
                                <i>2010-2014</i>
                            </div>
                        </div>                    
                },
                {
                    id: "experience",
                    title: 'Experience',
                    className: 'section row different',
                    content:  
                    <div>
                        <div className="label bold">
                            Software Engineer
                        </div>                   
                        <div className="">
                            <div className="">
                            Delivered features using Agile scrum
                            </div>
                            <div className="">
                            Created generic, reusable UI components that communicated through pubsub (KnockoutJS/Kendo/Postal)
                            </div>
                            <div className="">
                            Write UI tests using NightwatchJS, as well as unit tests for generic components using Jasmine. 
                            </div>
                            <div className="">
                            Collaborated with the UX team to deliver a clean styled front end for our application powered by (Bootstrap 4/Sass)
                            </div>
                            <div className="">
                            Format and automate Jenkins logs using Splunk (allowed for robust queries on info/errors/warnings).
                            </div>
                            
                        </div>
                    </div>
                },
                {
                    id: "skills",
                    title: 'Skills',
                    content: 'Blah'
                },
                {
                    id: "contact",
                    title: 'Contact',
                    content: 'Blah'
                }
            ]
        }
    }

    componentDidMount (){


        window.addEventListener('scrollTop', this.handleScrollTop.bind(this));
        
    }

    handleScrollTop () {
        console.log('scrolled!');
    }


    render() {

        let sections = this.state.sections.map(section => {
            return (
                <div className={section.className ||"section row"} key={section.title} id={section.id}>
                    <div className="section-title col-2">{section.title}</div>
                    <div className="section-content col-8">
                        {section.content}
                    </div>
                    <div className="section-content col-2"></div>
                </div>
            );
        });

        console.log(sections);

        return (
        <div>
           {sections}
        </div>
        );
  }
}