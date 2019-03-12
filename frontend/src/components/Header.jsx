import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { GoogleLogout } from 'react-google-login';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';

import logo from '../images/drawchange_logo_white.png';
import styles from '../styles/Header.module.css';

const NavLabel = styled.p`
  color: white;
  margin: auto;
  margin-left: 2rem;
  flex: 1;
  font-weight: 600;
  font-size: 1.3rem;
`;

const FlexContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
`;

const getNavLabel = role => {
  if (role === 'admin') return 'Admin Dashboard';
  else return 'Volunteer Dashboard';
};

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = _ => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { onLogout, loggedIn, role } = this.props;
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Container>
            <NavbarBrand tag={Link} to="/">
              <img style={{ width: '175px' }} alt="drawchange logo" src={logo} />
            </NavbarBrand>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {loggedIn ? (
                <FlexContainer className="navbar-nav">
                  <NavLabel>{getNavLabel(role)}</NavLabel>
                  <NavItem className={styles.navItem}>
                    <NavLink href="http://www.drawchange.org">Back to Main Site</NavLink>
                  </NavItem>
                  <NavItem className={styles.navItem}>
                    <NavLink onClick={onLogout} href="/">
                      Logout
                    </NavLink>
                  </NavItem>
                </FlexContainer>
              ) : (
                <Nav navbar>
                  <NavItem className={styles.navItem}>
                    <NavLink href="http://www.drawchange.org">Home</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar className={styles.navItem}>
                    <DropdownToggle nav>About Us</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="http://www.drawchange.org/faqs">FAQs</DropdownItem>
                      <DropdownItem href="http://www.drawchange.org/foundersstory">
                        Founder's Story
                      </DropdownItem>
                      <DropdownItem href="http://www.drawchange.org/curriculum-blueprint">
                        Curriculum & Blueprint
                      </DropdownItem>
                      <DropdownItem href="http://www.drawchange.org/friends-partners">
                        Our Friends & Partners
                      </DropdownItem>
                      <DropdownItem href="http://www.drawchange.org/store">Store</DropdownItem>
                      <DropdownItem href="http://www.drawchange.org/press-kit">
                        Press Kit
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar className={styles.navItem}>
                    <DropdownToggle nav>Contribute</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="https://secure.donationpay.org/drawchange/">
                        Donate
                      </DropdownItem>
                      <DropdownItem href="/">Volunteer With Us</DropdownItem>
                      <DropdownItem href="http://www.drawchange.org/wishlist">
                        Wish List
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem className={styles.navItem}>
                    <NavLink href="http://www.drawchange.org/blog">News</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar className={styles.navItem}>
                    <DropdownToggle nav>Activities</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="https://www.drawchange.org/usprograms">
                        U.S. Programs
                      </DropdownItem>
                      <DropdownItem href="https://www.drawchange.org/costarica">
                        Costa Rica
                      </DropdownItem>
                      <DropdownItem href="https://www.drawchange.org/ethiopia">
                        Ethipoia
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem className={styles.navItem}>
                    <NavLink href="http://www.drawchange.org/contactus">Contact</NavLink>
                  </NavItem>
                  <NavItem className={styles.navItem}>
                    <NavLink href="https://secure.donationpay.org/drawchange/">Donate</NavLink>
                  </NavItem>
                </Nav>
              )}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
