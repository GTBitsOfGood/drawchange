import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  Container,
  Row
} from 'reactstrap';

import logo from '../images/drawchange_logo_white.png';
// import styles from '../styles/Header.module.css'

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
    return (
      <div>
        <Navbar color="dark" dark expand="md" style={{ height: '70px' }}>
          <Container>
            <Row>
              <NavbarBrand tag={Link} to="/">
                <img style={{ width: '175px' }} alt="drawchange logo" src={logo} />
              </NavbarBrand>
            </Row>
            <Row>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="http://www.drawchange.org">Home</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      About Us
                    </DropdownToggle>
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
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Contribute
                    </DropdownToggle>
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
                  <NavItem>
                    <NavLink href="http://www.drawchange.org/blog">News</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Activities
                    </DropdownToggle>
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
                  <NavItem>
                    <NavLink href="http://www.drawchange.org/contactus">Contact</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://secure.donationpay.org/drawchange/">Donate</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Row>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
