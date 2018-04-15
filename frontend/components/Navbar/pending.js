// NPM Packages
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from "react-bootstrap";
//import './assets/stylesheets/base.scss';

export const PendingNavbar = ({logout}) => (
  <Navbar inverse collapseOnSelect className="navBar">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">drawchange Volunteer Portal</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer exact to="/application">
          <NavItem>My Application</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <LinkContainer
          isActive={() => false}
          onClick={logout}
          to="/"
        >
          <NavItem>Logout</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

PendingNavbar.propTypes = {
  logout: PropTypes.func
};

