import React, { Component } from "react";
import Like from "./like";
import { NavLink } from "react-router-dom";
import "../../index.css";

class TableBody extends Component {
  render() {
    const { onSort, handleDelete, handleLike, filtered } = this.props;
    return (
      <tbody>
        {onSort(filtered).map((movie) => (
          <tr key={movie._id}>
            <td>
              <NavLink
                className="item-list"
                to={`/movie/${movie.title}/${movie._id}`}
              >
                {movie.title}
              </NavLink>
            </td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like onLike={() => handleLike(movie)} liked={movie.isLike} />
            </td>
            <td>
              <button
                onClick={() => handleDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
