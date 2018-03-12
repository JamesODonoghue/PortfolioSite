import React from 'react';
// const imageOne = require("../../images/NagataPic1.png");
// const imageTwo = require("../../images/NagataPic2.png");



export default class Carousel extends React.Component {

    componentDidMount() {

    }
    render() {
        return (
            <div className="jumbotron-fluid">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            {/* <img className="d-block w-100" src={imageOne} alt="First slide"/> */}
                        </div>
                        <div className="carousel-item">
                            {/* <img className="d-block w-100" src={imageTwo} alt="Second slide"/> */}
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
    );
  }
}