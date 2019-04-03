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

const CustomNavItem = styled(NavItem)`
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  text-align: center;
  min-width: 7rem;
`;

const CustomDropdown = styled(UncontrolledDropdown)`
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  text-align: center;
  min-width: 7rem;
`;

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
                  <CustomNavItem>
                    <NavLink href="http://www.drawchange.org">Back to Main Site</NavLink>
                  </CustomNavItem>
                  <CustomNavItem>
                    <NavLink onClick={onLogout} href="/">
                      Logout
                    </NavLink>
                  </CustomNavItem>
                </FlexContainer>
              ) : (
                <Nav navbar>
                  <CustomNavItem>
                    <NavLink href="http://www.drawchange.org">Home</NavLink>
                  </CustomNavItem>
                  <CustomDropdown nav inNavbar>
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
                  </CustomDropdown>
                  <CustomDropdown nav inNavbar>
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
                  </CustomDropdown>
                  <CustomDropdown>
                    <NavLink href="http://www.drawchange.org/blog">News</NavLink>
                  </CustomDropdown>
                  <CustomDropdown nav inNavbar>
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
                  </CustomDropdown>
                  <CustomNavItem>
                    <NavLink href="http://www.drawchange.org/contactus">Contact</NavLink>
                  </CustomNavItem>
                  <CustomDropdown>
                    <NavLink href="https://secure.donationpay.org/drawchange/">Donate</NavLink>
                  </CustomDropdown>
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
