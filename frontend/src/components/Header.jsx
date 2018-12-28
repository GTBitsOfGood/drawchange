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
  Row,
} from 'reactstrap';

import logo from '../images/drawchange_logo_white.webp';
// import styles from '../styles/Header.module.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    // this.hover = this.hover.bind(this);
    // this.onMouseEnter = this.onMouseEnter.bind(this);
    // this.onMouseLeave = this.onMouseLeave.bind(this);
    // this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      // dropdownOpen: false
    };
  }

  // hover() {
  //   this.setState(prevState => ({
  //     dropdownOpen: !prevState.dropdownOpen
  //   }));
  // }
  // onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} hover={this.hover}
  // onMouseEnter() {
  //   this.setState({dropdownOpen: true});
  // }

  // onMouseLeave() {
  //   this.setState({dropdownOpen: false});
  // }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" style={{height: '70px' }}>
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
                  <NavLink  href="http://www.drawchange.org">
                    Home
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle  nav caret >
                    About Us
                  </DropdownToggle>
                  <DropdownMenu left >
                    <DropdownItem href="http://www.drawchange.org/faqs" target="_blank">FAQs</DropdownItem>
                    <DropdownItem href="http://www.drawchange.org/foundersstory" target="_blank">Founder's Story</DropdownItem>
                    <DropdownItem href="http://www.drawchange.org/curriculum-blueprint" target="_blank">Curriculum & Blueprint</DropdownItem>
                    <DropdownItem href="http://www.drawchange.org/friends-partners" target="_blank">Our Friends & Partners</DropdownItem>
                    <DropdownItem href="http://www.drawchange.org/store" target="_blank">Store</DropdownItem>
                    <DropdownItem href="http://www.drawchange.org/press-kit" target="_blank">Press Kit</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle  nav caret >
                    Contribute
                  </DropdownToggle>
                  <DropdownMenu left>
                    <DropdownItem href="https://secure.donationpay.org/drawchange/" target="_blank">Donate</DropdownItem>
                    <DropdownItem href="/apply" target="_blank">Volunteer With Us</DropdownItem>
                    <DropdownItem href="http://www.drawchange.org/wishlist" target="_blank">Wish List</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink href="http://www.drawchange.org/blog" target="_blank">News</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Activities
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink href="http://www.drawchange.org/contactus" target="_blank">
                    Contact
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://secure.donationpay.org/drawchange/" target="_blank">
                    Donate
                  </NavLink>
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
