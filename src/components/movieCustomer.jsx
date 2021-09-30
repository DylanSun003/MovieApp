import React, { Component } from "react";
import GetType from "./common/getType";
import MovieBox from "./common/movieBox";
import SearchBar from "./common/searchBar";
import { apiURL } from "../config.json";
import FrontPageShow from "./common/frontPageShow";

const styleForH4 = { margin: "5px 2px 10px" };

class MovieCustomer extends Component {
  state = {
    movies: [],
    listLength: 0,
    currentType: "All Type",
    searchKey: "",
    userName: "",
  };

  async componentDidMount() {
    let movies = await fetch(`${apiURL}/movies`)
      .then((response) => response.json())
      .then((data) => data);
    this.setState({ movies: movies });
    this.setState({ listLength: movies.length });
  }

  render() {
    const { listLength, currentType, movies } = this.state;
    if (listLength === 0) return <p>There is no movie in the list</p>;

    return (
      <div
        className="container"
        style={{ margin: "0px", padding: "0px", "max-width": "100%" }}
      >
        <FrontPageShow />
        <div className="row" style={{ "flex-wrap": "nowrap", margin: "10px" }}>
          <div className="col-2" style={{ height: "100%" }}>
            <SearchBar
              className="searchBar"
              movies={movies}
              onSearch={this.handleSearch}
            />

            <GetType
              onTypeChange={this.handleTypeChange}
              movies={movies}
              currentType={currentType}
            />
          </div>

          <div className="col" style={{ width: "80%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <h4 style={styleForH4}>{this.state.currentType}</h4>
              <p>
                Showing{" "}
                <span>
                  {this.getCurrentSearchItem(this.getCurrentTypeItem()).length}
                </span>{" "}
                movies in the database
              </p>
            </div>
            <MovieBox
              movies={movies}
              getCurrentSearchItem={this.getCurrentSearchItem}
              getCurrentTypeItem={this.getCurrentTypeItem}
              searchKey={this.state.searchKey}
            />
          </div>
        </div>
      </div>
    );
  }

  handleSearch = ({ currentTarget: input }) => {
    let currentType = "All Type";
    this.setState({ currentType });
    this.setState({ searchKey: input.value });
    this.setState({ movieGlanceCallapse: true });
  };

  handleLike = (movie) => {
    // setLike(movie._id);
    const newMovieList = this.state.movies;
    this.setState({ movies: newMovieList });
  };

  handleTypeChange = (type) => {
    this.setState({ currentType: type });
    this.setState({ movieGlanceCallapse: true });
  };

  getCurrentTypeItem = () => {
    const { currentType, movies } = this.state;
    let movieList = movies.filter(
      (movie) => capitalizeString(movie.genre.name) === currentType
    );
    if (currentType === "All Type") return movies;
    return movieList;
  };

  getCurrentSearchItem = (allTypeItemList) => {
    let newMovieList = [];

    for (let i = 0; i < allTypeItemList.length; i++) {
      if (
        allTypeItemList[i].title
          .toLowerCase()
          .includes(this.state.searchKey.toLowerCase())
      )
        newMovieList.push(allTypeItemList[i]);
    }
    return newMovieList;
  };
}

function capitalizeString(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

export default MovieCustomer;
