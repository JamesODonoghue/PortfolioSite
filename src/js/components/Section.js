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

                        <ul className="list-group">
                            <li className="list-group-item">
                                Node    
                            </li>
                    
                        </ul>
                },
                {
                    id: "experience",
                    title: 'Experience',
                    content: 'Blah'
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
                <div className="section" key={section.title} id={section.id}>
                    <h1>{section.title}</h1>
                    <div className="section-content">
                        {section.content}

                    </div>
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