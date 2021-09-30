import React, { Component } from "react";

const SearchBar = (props) => {
  const { onSearch } = props;
  return (
    <input
      className="form-control"
      type="text"
      placeholder="Search"
      onChange={onSearch}
    />
  );
};

export default SearchBar;
