// NPM Packages
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Logo from '../../assets/images/drawchange_logo.png';
//import './assets/stylesheets/base.scss';

export const AdminNavbar = ({ logout }) => (
  <Navbar collapseOnSelect className="navBar">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">
          <img style={{ width: '200px', overflow: 'hidden' }} src={Logo} />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav style={{ marginTop: '20px' }}>
        <LinkContainer exact to="/">
          <NavItem>Dashboard</NavItem>
        </LinkContainer>
        <LinkContainer to="/events">
          <NavItem>Events</NavItem>
        </LinkContainer>
        <LinkContainer to="/volunteers">
          <NavItem>Volunteers</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <LinkContainer isActive={() => false} onClick={logout} to="/">
          <NavItem>Logout</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

AdminNavbar.propTypes = {
  logout: PropTypes.func
};
