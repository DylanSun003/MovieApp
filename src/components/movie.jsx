import React, { Component } from "react";
import Pagination from "./common/pagination";
import GetType from "./common/getType";
import MovieTable from "./movieTable";
import { NavLink } from "react-router-dom";
import SearchBar from "./common/searchBar";

import { apiURL } from "../config.json";

class Movie extends Component {
  state = {
    movies: [],
    listLength: 0,
    pageSize: 5, // each page can contain 5 items
    currentPage: 1,
    currentType: "All Type",
    searchKey: "",
  };

  async componentDidMount() {
    let movies = await fetch(`${apiURL}/movies`)
      .then((response) => response.json())
      .then((data) => data);
    this.setState({ movies: movies });
    this.setState({ listLength: movies.length });
  }

  render() {
    const { listLength, pageSize, currentPage, currentType, movies } =
      this.state;
    if (listLength === 0) return <p>There is no movie in the list</p>;

    return (
      <div className="container">
        <div className="row">
          <div className="col-2">
            <GetType
              onTypeChange={this.handleTypeChange}
              movies={movies}
              currentType={currentType}
            />
          </div>
          <div className="col">
            <NavLink to="/movie/addNew">
              <button type="button" className="btn btn-primary mb-2">
                <i className="fas fa-plus"></i> Add New Movie
              </button>
            </NavLink>

            <p>
              Showing <span>{this.getCurrentTypeItem().length}</span> movies in
              the database
            </p>
            <SearchBar movies={movies} onSearch={this.handleSearch} />
            <MovieTable
              movies={movies}
              handleDelete={this.handleDelete}
              handleLike={this.handleLike}
              getCurrentPageItem={this.getCurrentPageItem}
              getCurrentTypeItem={this.getCurrentTypeItem}
              getCurrentSearchItem={this.getCurrentSearchItem}
            />
            <Pagination
              itemCount={
                this.getCurrentSearchItem(this.getCurrentTypeItem()).length
              }
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
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
    this.setState({ currentPage: 1 });
  };

  handleDelete = async (movie) => {
    const originalDataMovie = this.state.movies;
    try {
      await fetch(`${apiURL}/movies/${movie._id}`, {
        method: "DELETE",
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        console.log("this movie is not in the database");
      this.setState({ movies: originalDataMovie });
    }
    const newMovieList = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: newMovieList });
    this.state.listLength--;
  };

  handleLike = (movie) => {
    // setLike(movie._id);
    const newMovieList = this.state.movies;
    this.setState({ movies: newMovieList });
  };

  handlePageChange = (pageNum) => {
    this.setState({ currentPage: pageNum });
  };

  handleTypeChange = (type) => {
    this.setState({ currentType: type });
    this.setState({ currentPage: 1 });
  };
  getCurrentPageItem = (allSearchItemList) => {
    const { pageSize, currentPage } = this.state;
    let movieList = allSearchItemList.slice(
      (currentPage - 1) * pageSize, // startIndex
      currentPage * pageSize // endIndex
    );
    return movieList;
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

export default Movie;
