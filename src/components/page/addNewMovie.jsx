import React, { Component } from "react";
import InputForm from "../common/inputForm";
import { apiURL } from "../../config.json";

const findIdAndGenreName = (inputString) => {
  let seperator = "/";
  let idStopAt = inputString.search(seperator);
  return idStopAt;
};

class AddNewMovie extends Component {
  state = {
    newMovie: {
      name: "",
      genre: { name: "", _id: "" },
      stock: "",
      rate: "",
    },
    errors: {
      name: this.props.errors ? this.props.errors.name : "",
      genre: this.props.errors ? this.props.errors.genre : "",
      stock: this.props.errors ? this.props.errors.stock : "",
      rate: this.props.errors ? this.props.errors.rate : "",
    },
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.movie != this.props.movie)
      this.setState({
        newMovie: {
          name: nextProps.movie.name,
          genre: nextProps.movie.genre,
          stock: nextProps.movie.stock,
          rate: nextProps.movie.rate,
        },
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {Object.keys(this.state.newMovie).map((movieDetial) => (
          <InputForm
            key={movieDetial}
            errorsStatus={this.state.errors}
            formName={this.getFormName(movieDetial)}
            type={
              movieDetial === "stock" || movieDetial === "rate"
                ? "number"
                : "text"
            }
            value={this.state.newMovie[movieDetial]}
            name={movieDetial}
            onChange={this.handleEnterForm}
            validateFormWithErrorMessage={this.validateFormWithErrorMessage(
              movieDetial,
              this.state.newMovie[movieDetial]
            )}
          />
        ))}
        <button
          onClick={this.handleSave}
          type="button"
          className={this.getSaveButtonClass()}
        >
          Save
        </button>
      </form>
    );
  }

  handleEnterForm = ({ currentTarget: input }) => {
    const { newMovie, errors } = this.state;
    let errorMessage = this.validateFormWithErrorMessage(
      input.name,
      input.value
    );
    let errorsData = { ...errors };
    if (errorMessage) {
      errorsData[input.name] = input.value;
    } else delete errorsData[input.name];

    const newMovieData = { ...newMovie };
    if (input.name === "stock" || input.name === "rate")
      newMovieData[input.name] = parseInt(input.value);
    else if (input.name === "genre") {
      newMovieData[input.name]._id = input.value.substring(
        0,
        findIdAndGenreName(input.value)
      );
      newMovieData[input.name].name = input.value.substring(
        findIdAndGenreName(input.value) + 1,
        input.value.length
      );
    } else newMovieData[input.name] = input.value;
    if (newMovieData[input.name] === "") errorsData[input.name] = "";
    this.setState({ errors: errorsData });
    this.setState({ newMovie: newMovieData });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleSave = async () => {
    let data = {
      title: this.state.newMovie.name,
      genreId: this.state.newMovie.genre._id,
      numberInStock: this.state.newMovie.stock,
      dailyRentalRate: this.state.newMovie.rate,
    };
    let addMovieURL = "/movie/addNew";
    if (this.props.location.pathname === addMovieURL) {
      await fetch(`${apiURL}/movies/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((data) => console.log(data));
      this.props.history.push("/movie");
    } else {
      let movieID = this.props.location.pathname.slice(-24);
      await fetch(`${apiURL}/movies/${movieID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((data) => console.log(data));
      this.props.history.push("/movie");
    }
  };

  getFormName = (movieDetial) => {
    if (movieDetial === "name") return "movie name";
    if (movieDetial === "genre") return movieDetial;
    return movieDetial;
  };

  getSaveButtonClass = () => {
    let saveClass = "btn btn-primary";

    for (let i = 0; i < Object.keys(this.state.errors).length; i++) {
      if (this.state.errors[Object.keys(this.state.errors)[i]] !== null)
        saveClass += " disabled";
    }
    return saveClass;
  };

  validateFormWithErrorMessage = (name, value) => {
    let errorMessage;
    if (!name === "genre") {
      if (value.length === 0) {
        errorMessage = name + " is required";
        return errorMessage;
      }
    }
    if (name === "stock" || name === "rate") {
      errorMessage = value < 0 ? name + " cannot less than 0" : null;
    }
    return errorMessage;
  };
}

export default AddNewMovie;
