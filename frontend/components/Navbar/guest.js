// NPM Packages
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/lib/Navbar";

export const GuestNavbar = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">drawchange Volunteer Portal</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
  </Navbar>
);

