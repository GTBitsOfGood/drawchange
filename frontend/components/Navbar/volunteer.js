// NPM Packages
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from "react-bootstrap";
//import './assets/stylesheets/base.scss';

export const VolunteerNavbar = ({ logout }) => (
  <Navbar collapseOnSelect className="navBar row-fluid">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/"><img style={{width:"200px", overflow:"hidden"}} src="http://drawchange.org/wp-content/uploads/2014/02/LOGO_dc.png"></img></Link>
      </Navbar.Brand>
      
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav style={{marginTop:"20px"}}>
        <LinkContainer exact to="/">
          <NavItem>Dashboard</NavItem>
        </LinkContainer>
        <LinkContainer to="/events">
          <NavItem>Events</NavItem>
        </LinkContainer>
        <LinkContainer to="/contactus">
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
