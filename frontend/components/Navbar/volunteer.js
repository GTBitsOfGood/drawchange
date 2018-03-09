// NPM Packages
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from "react-bootstrap";

export const VolunteerNavbar = ({ logout }) => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">drawchange Volunteer Portal</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Dashboard</NavItem>
        </LinkContainer>
        <LinkContainer to="/events">
          <NavItem>Events</NavItem>
        </LinkContainer>
        <LinkContainer to="/">
          <NavItem>Contact Us</NavItem>
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

VolunteerNavbar.propTypes = {
  logout: PropTypes.func
};
