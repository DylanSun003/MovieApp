import React from "react";
import ReactDOM from "react-dom";

// import App from "./App";
// import Counter from "./components/counter";
// import Counters from "./components/counters";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import MovieApp from "./movieApp";

ReactDOM.render(
  <BrowserRouter>
    <MovieApp />
  </BrowserRouter>,
  document.getElementById("root")
);
