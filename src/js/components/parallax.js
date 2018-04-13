import React from 'react';
const CLASS_DEFAULT = 'parallax-window ';



export default class Parallax extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            class: props.class ? CLASS_DEFAULT + props.class : 'parallax-window',
            style: {}
        };
    }
    
    handleScroll() {
        var scrollTop = window.pageYOffset;

        var topPos = -scrollTop *.2 + 'px';
        var styleObj = {
            top: topPos
        }; 

        this.setState({style: styleObj})
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    render() {
        return (
            <div className={this.state.class} style={this.state.style}></div>
    );
  }
}