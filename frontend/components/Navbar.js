// NPM Packages
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.logoutAction = this.props.logoutAction;
    this.user = this.props.user;
  }
  navSwitching(user) {
    if (user !== null) {
      if (user.bio.role === 'volunteer') {
        return (
                    <Nav>
                        <LinkContainer exact to="/">
                            <NavItem>Dashboard</NavItem>
                        </LinkContainer>
                    </Nav>
        );
      }
    }

    return (
              <Nav>
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
    );
  }

  render() {
    return (
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">drawchange Volunteer Portal</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                {this.navSwitching(this.user)}
                <Nav pullRight>
                  <LinkContainer isActive={() => false} onClick={ this.logoutAction } to="/">
                    <NavItem>Logout</NavItem>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
    );
  }

}


NavBar.propTypes = {
  logoutAction: PropTypes.func,
  user: PropTypes.object
};

export default NavBar;