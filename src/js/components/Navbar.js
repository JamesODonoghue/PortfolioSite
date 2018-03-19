import React from 'react';
import $ from 'jquery';


export default class Header extends React.Component {
    
    componentDidMount () {

        var stickyNav = $('.navbar').offset().top;

        console.log(stickyNav);

        $("nav").find("a").click(function(e) {
            e.preventDefault();
            var section = $(this).attr("href");
            var scrollTop = $(window).scrollTop();
            console.log(scrollTop);

            $("html, body").animate({
                scrollTop: $(section).offset().top -200
            });
        });

        $(window).scroll(function () {
            if ($(window).scrollTop() > stickyNav ) {
              $('.navbar').addClass('fixed-top');
            } else{
              $('.navbar').removeClass('fixed-top');
            }
          });
        
    }
    render() {
  
        return (
  
            <div>

                <nav className="navbar navbar-expand-lg navbar-light justify-content-center fixed">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="pill" href="#experience"> Experience </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="pill" href="#skills"> Skills </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="pill" href="#education"> Education </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="pill" href="#contact"> Contact </a>
                        </li>
                        
                    </ul>
                </nav>
    
            </div>
    );
  }
}