import React, { Component } from "react";

class MovieGlancePad extends React.Component {
  render() {
    const {
      getMovieGlance,
      getDailyRentalRate,
      getGenreOfMovieSelected,
      getNumberInStock,
      getGlanceImgURL,
      movieSelected,
    } = this.props;

    return (
      <div className={getMovieGlance() + " content"}>
        <div
          className="background content-container"
          style={{
            "background-image": `linear-gradient(to right, rgb(0 0 0), rgba(38, 37, 38, 0.1)),url(${getGlanceImgURL()})`,
          }}
        >
          <div className="front--page__body__content">
            <h1>{movieSelected.title}</h1>
            <p className="info--movie">
              {getGenreOfMovieSelected()}
              <span>• Daily Rental Rate: ${getDailyRentalRate()}</span>
            </p>

            <p className="movie--description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              distinctio perferendis impedit officia odio rerum corrupti
              repudiandae tempore dolor necessitatibus cum, aut nostrum, magnam
              soluta ut consectetur, pariatur eius. Veritatis.
            </p>
            <button className="btn btn--bordered">
              RENT NOW: {getNumberInStock()} In stock
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieGlancePad;
