import React, { Component } from "react";
import { apiURL } from "../../config.json";

function capitalizeString(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

class InputForm extends Component {
  state = {
    genres: [],
  };
  async componentDidMount() {
    let types = [{ _id: "", name: "", __v: 0 }];
    const genres = await fetch(`${apiURL}/genres`)
      .then((response) => response.json())
      .then((data) => data);
    types = [...types, ...genres];
    this.setState({ genres: types });
  }

  render() {
    const {
      formName,
      type,
      value,
      onChange,
      name,
      errorsStatus,
      validateFormWithErrorMessage,
    } = this.props;

    return (
      <div className="login--input">
        <label htmlFor="InputEmail" className="form-label">
          {formName.charAt(0).toUpperCase() + formName.slice(1)}
        </label>
        {name !== "genre" ? (
          <input
            required
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            className={getInputClassName(errorsStatus, name)}
            // placeholder={formName.charAt(0).toUpperCase() + formName.slice(1)}
          />
        ) : (
          <select
            required
            name={name}
            onChange={onChange}
            className={getInputClassName(errorsStatus, name)}
            aria-label="Default select example"
            // placeholder={formName.charAt(0).toUpperCase() + formName.slice(1)}
          >
            {this.state.genres.map((genre) => (
              <option
                value={genre._id + "/" + genre.name}
                selected={genre.name === value.name ? true : false}
              >
                {genre.name}
              </option>
            ))}
          </select>
        )}
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">{validateFormWithErrorMessage}</div>
      </div>
    );
  }
}

const getInputClassName = (errorsStatus, name) => {
  let inputClass = "form-control";
  inputClass +=
    name in errorsStatus && errorsStatus[name] != null
      ? " is-invalid"
      : " is-valid";
  return inputClass;
};

export default InputForm;
