import React, { Component } from "react";
import { apiURL } from "../../config.json";

function capitalizeString(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

class GetType extends Component {
  state = {
    types: [],
  };

  async componentDidMount() {
    const genres = await fetch(`${apiURL}/genres`)
      .then((response) => response.json())
      .then((data) => data.map((genre) => capitalizeString(genre.name)));
    this.setState({ types: ["All Type", ...genres] });
  }

  render() {
    const { currentType, onTypeChange } = this.props;

    return (
      <ul className="list-group">
        {this.state.types.map((type) => (
          <li
            style={{ cursor: "pointer" }}
            key={type}
            className={this.getCurrentTypeBadge(type, currentType)}
            onClick={() => onTypeChange(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    );
  }

  getCurrentTypeBadge = (type, currentType) => {
    let currentTypeClass = "list-group-item ";
    currentTypeClass += type === currentType ? " active" : "";
    return currentTypeClass;
  };
}

export default GetType;
