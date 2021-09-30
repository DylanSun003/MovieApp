import React, { Component } from "react";
import AddNewMovie from "./addNewMovie";
import { apiURL } from "../../config.json";
class MovieDetails extends Component {
  state = {
    movie: {
      name: "",
      genre: {
        name: "",
        _id: "",
      },
      stock: 0,
      rate: 0,
    },
    errors: {
      name: null,
      genre: null,
      stock: null,
      rate: null,
    },
  };
  async componentDidMount() {
    try {
      let data = await fetch(`${apiURL}/movies/${this.props.match.params.id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => data);
      let { title, genre, numberInStock, dailyRentalRate } = data;
      this.setState({
        movie: {
          name: title,
          genre: genre,
          stock: numberInStock,
          rate: dailyRentalRate,
        },
      });
    } catch (ex) {
      if (ex) this.props.history.replace("/not-found");
    }
  }

  render() {
    const { movie, errors } = this.state;
    return (
      <div>
        <h1>Movie Details - {movie.name} </h1>
        <AddNewMovie
          movie={movie}
          errors={errors}
          history={this.props.history}
          location={this.props.location}
        />
      </div>
    );
  }
}

export default MovieDetails;
