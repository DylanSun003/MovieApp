import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/page/home";
import HomeCustomer from "./components/page/homeCustomer.jsx";
import Customers from "./components/page/customers";
import Rentals from "./components/page/rentals";
import NotFound from "./components/page/notFound";
import NavBar from "./components/common/NavBar";
import MovieDetails from "./components/page/movieDetails";
import LoginForm from "./components/page/loginForm";
import AddNewMovie from "./components/page/addNewMovie";

class MovieApp extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div style={{ margin: "0px", padding: "0px" }}>
          <Switch>
            <Route path="/movie/addNew" component={AddNewMovie} />
            <Route path="/movie/:title/:id" component={MovieDetails} />
            <Route path="/login" component={LoginForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/movie" exact component={Home} />
            <Route path="/customer/movie" exact component={HomeCustomer} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieApp;
