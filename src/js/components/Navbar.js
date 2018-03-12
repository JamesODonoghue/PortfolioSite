import React from 'react';
import $ from 'jquery';


export default class Header extends React.Component {
    
    componentDidMount () {

        $("nav").find("a").click(function(e) {
            e.preventDefault();
            var section = $(this).attr("href");
            $("html, body").animate({
                scrollTop: $(section).offset().top -500
            });
        });
        
    }
    render() {
  
        return (
  
            <div>

                <nav className="navbar navbar-expand-lg navbar-light justify-content-center fixed">
                    <a className="nav-link" href="#experience"> Experience </a>
                    <a className="nav-link" href="#skills"> Skills </a>
                    <a className="nav-link" href="#education"> Education </a>
                    <a className="nav-link" href="#contact"> Contact </a>
                </nav>
    
            </div>
    );
  }
}