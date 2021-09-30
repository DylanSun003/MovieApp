import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MovieTable extends Component {
  state = {
    sortColumn: { path: "Title", order: "asc" },
  };

  render() {
    const {
      getCurrentPageItem,
      getCurrentTypeItem,
      getCurrentSearchItem,
      handleLike,
      handleDelete,
    } = this.props;

    const filtered = getCurrentPageItem(
      getCurrentSearchItem(getCurrentTypeItem())
    );
    return (
      <table className="table">
        <TableHeader
          sortColumn={this.state.sortColumn}
          handleSortChange={this.handleSortChange}
        />
        <TableBody
          filtered={filtered}
          onSort={this.onSort}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      </table>
    );
  }
  handleSortChange = (sortColumn) => {
    if (sortColumn.path !== "like" && sortColumn.path !== "delete") {
      this.state.sortColumn.path === sortColumn.path &&
      this.state.sortColumn.order === "asc"
        ? (sortColumn.order = "des")
        : (sortColumn.order = "asc");
      this.setState({ sortColumn });
    }
  };

  onSort = (movies) => {
    let movieList = [];
    let currentSort = this.state.sortColumn;
    if (currentSort.path === "Title") {
      let movieSortedList = movies.map((movie) => movie.title).sort();
      for (let i = 0; i < movieSortedList.length; i++)
        movieList.push(
          movies.filter((movie) => movie.title === movieSortedList[i])[0]
        );
    } else if (currentSort.path === "Genre") {
      let movieSortedList = [
        ...new Set(movies.map((movie) => movie.genre.name).sort()),
      ];
      for (let j = 0; j < movieSortedList.length; j++) {
        for (let i = 0; i < movies.length; i++)
          if (movies[i].genre.name === movieSortedList[j])
            movieList.push(movies[i]);
      }
    } else if (currentSort.path === "Stock") {
      let movieSortedList = [
        ...new Set(
          movies.map((movie) => movie.numberInStock).sort(compareNumbers)
        ),
      ];
      for (let j = 0; j < movieSortedList.length; j++) {
        for (let i = 0; i < movies.length; i++)
          if (movies[i].numberInStock === movieSortedList[j])
            movieList.push(movies[i]);
      }
    } else if (currentSort.path === "Rate") {
      let movieSortedList = [
        ...new Set(
          movies.map((movie) => movie.dailyRentalRate).sort(compareNumbers)
        ),
      ];

      for (let j = 0; j < movieSortedList.length; j++) {
        for (let i = 0; i < movies.length; i++)
          if (movies[i].dailyRentalRate === movieSortedList[j])
            movieList.push(movies[i]);
      }
    }
    if (currentSort.order === "des") {
      return movieList.reverse();
    } else return movieList;
  };
}
function compareNumbers(a, b) {
  return a - b;
}

export default MovieTable;
