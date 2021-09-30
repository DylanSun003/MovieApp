import React, { Component } from "react";
import MovieGlancePad from "./movieGlancePad";
// import "../css/MovieBox.css";

const CONTAINERWIDTH = 1090;
const ELEMENTWIDTH = 240;

const style = {
  fas: {
    fontSize: "4rem",
    zIndex: 1,
    position: "absolute",
    color: "#00000059",
    alignSelf: "center",
    cursor: "pointer",
  },
};

class MovieBox extends React.Component {
  state = {
    movieSelected: {
      title: "",
      genre: { name: "", _id: "" },
      numberInStock: 0,
      dailyRentalRate: 0,
      glanceImgURL: "",
    },
    movieGlanceCallapse: true,
    distance: 0,
    movieNumInCurrentViewport: 0,
    viewed: 0,
  };

  componentDidMount() {
    this.setState({
      movieNumInCurrentViewport: Math.floor(CONTAINERWIDTH / ELEMENTWIDTH),
    });

    this.setState({
      viewed: this.state.viewed + this.state.movieNumInCurrentViewport,
    });

    this.setState({
      distance:
        this.state.distance -
        this.state.movieNumInCurrentViewport * ELEMENTWIDTH,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ movieGlanceCallapse: true });
      this.setState({ movieSelected: {} });
    }
  }

  render() {
    require("../css/MovieBox.css"); // this css is only locally used
    const { getCurrentTypeItem, getCurrentSearchItem, searchKey } = this.props;
    const filtered = this.getMovieListAfterSearchAndType(
      getCurrentTypeItem,
      getCurrentSearchItem
    );
    const movies = filtered;

    return (
      <div style={{ marginBottom: "50px" }}>
        <ul className="list-group list-group-horizontal containerOfMovie">
          <i
            className="fas fa-chevron-left"
            onClick={() => this.handleSlidePrev()}
            style={{ ...style.fas, ...{ visibility: this.hasPrev() } }}
          ></i>
          <i
            className="fas fa-chevron-right"
            onClick={() => this.handleSlideNext()}
            style={style.fas}
            style={{ ...style.fas, ...{ visibility: this.hasNext(movies) } }}
          ></i>
          {movies.map((movie) => (
            <li
              key={movie.title}
              className="list--movie"
              style={{
                transform: `translateX(${this.state.distance}px`,
              }}
              onClick={() => this.handleSelect(movie, searchKey)}
            >
              <img
                src={movie.imgURL}
                className="card-img"
                alt={`${movie.title}`}
                style={{ border: this.getBoader(movie) }}
              />
            </li>
          ))}
        </ul>
        <MovieGlancePad
          getMovieGlance={this.getMovieGlance}
          getGenreOfMovieSelected={this.getGenreOfMovieSelected}
          getDailyRentalRate={this.getDailyRentalRate}
          getNumberInStock={this.getNumberInStock}
          getGlanceImgURL={this.getGlanceImgURL}
          movieSelected={this.state.movieSelected}
        />
      </div>
    );
  }
  handleSelect = (movie) => {
    const { title, genre, numberInStock, dailyRentalRate, glanceImgURL } =
      movie;

    // if glance pad is already opened, click on another movie show that movie detail,
    //    if glance pad is already opened, click on the same movie callapse the glance pad
    // else if glance pad isn't opened, and no movie selected, click on any movie show the detail pad
    if (!this.state.movieGlanceCallapse) {
      this.setState({
        movieSelected: {
          title,
          genre,
          numberInStock,
          dailyRentalRate,
          glanceImgURL,
        },
      });

      if (this.state.movieSelected.title == movie.title) {
        this.setState({ movieGlanceCallapse: true });
        this.setState({ movieSelected: {} });
      }
    } else {
      this.setState({
        movieSelected: {
          title,
          genre,
          numberInStock,
          dailyRentalRate,
          glanceImgURL,
        },
      });
      this.setState({ movieGlanceCallapse: !this.state.movieGlanceCallapse });
    }
  };

  getMovieGlance = () => {
    if (this.state.movieGlanceCallapse) return "container d-none";
    else return "container";
  };

  getGenreOfMovieSelected = () => {
    if (Object.keys(this.state.movieSelected).length !== 0)
      return this.state.movieSelected.genre.name;
  };

  getDailyRentalRate = () => {
    if (Object.keys(this.state.movieSelected).length !== 0)
      return this.state.movieSelected.dailyRentalRate;
  };

  getNumberInStock = () => {
    if (Object.keys(this.state.movieSelected).length !== 0)
      return this.state.movieSelected.numberInStock;
  };

  getGlanceImgURL = () => {
    if (Object.keys(this.state.movieSelected).length !== 0)
      return this.state.movieSelected.glanceImgURL;
  };

  getBoader = (movie) => {
    if (this.state.movieSelected.title == movie.title)
      return "7px solid #157aff";
    else return null;
  };

  getMovieListAfterSearchAndType = (
    getCurrentTypeItem,
    getCurrentSearchItem
  ) => {
    const filteredMovieList = getCurrentSearchItem(getCurrentTypeItem());

    return filteredMovieList;
  };

  handleSlideNext = () => {
    this.setState({
      movieNumInCurrentViewport: Math.floor(CONTAINERWIDTH / ELEMENTWIDTH),
    });

    this.setState({
      viewed: this.state.viewed + this.state.movieNumInCurrentViewport,
    });

    this.setState({
      distance:
        this.state.distance -
        this.state.movieNumInCurrentViewport * ELEMENTWIDTH,
    });
  };

  handleSlidePrev = () => {
    this.setState({
      movieNumInCurrentViewport: Math.floor(CONTAINERWIDTH / ELEMENTWIDTH),
    });

    this.setState({
      viewed: this.state.viewed - this.state.movieNumInCurrentViewport,
    });

    this.setState({
      distance:
        this.state.distance +
        this.state.movieNumInCurrentViewport * ELEMENTWIDTH,
    });
  };

  hasNext = (movies) => {
    if (
      movies.length <
      this.state.viewed + this.state.movieNumInCurrentViewport
    )
      return "hidden";
    else return "visible";
  };

  hasPrev = () => {
    if (this.state.distance >= 0) return "hidden";
    else return "visible";
  };
}

export default MovieBox;
