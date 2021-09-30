import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav">
        <NavLink className="navbar-brand nav-item" to="/movie">
          <img src="../../logo192.png" alt="" width="30" height="30" />
        </NavLink>

        <NavLink className="nav-item nav-link" to="/customer/movie">
          Home
        </NavLink>

        <NavLink className="nav-item nav-link" to="/customers">
          Customers
        </NavLink>

        <NavLink className="nav-item nav-link" to="/rentals">
          Rentals
        </NavLink>
      </div>
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/login">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
