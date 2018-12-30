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
  Col
} from 'reactstrap';

import logo from '../images/drawchange_logo_white.webp';
import styles from '../styles/Header.module.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      tetherConfig: {
        target: '#tether',
        attachment: 'middle left',
        targetAttachment: 'middle right',
        classPrefix: 'bs-tether',
        classes: { element: 'popover', enabled: 'open' },
        constraints: [
          { to: 'scrollParent', attachment: 'together none' },
          { to: 'window', attachment: 'together none' }
        ]
      }
    };
    this.toggle = this.toggle.bind(this);
  }



  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div> 
        <Container fluid>
          <header>
            <Row >
              <Col md="1" lg="2"className ={styles.dark} style={{padding: '0' }}></Col>
              <Col sm="12" md="11" lg="10" style={{padding: '0' }}>
              <Navbar color="dark" dark expand="md" toggleable>
                <NavbarBrand tag={Link} to="/">
                  <img style={{ width: '175px' }} alt="drawchange logo" src={logo} />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} right/>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink  href="http://www.drawchange.org">
                        Home
                      </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar >
                      <DropdownToggle  nav >
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
                      <DropdownToggle  nav >
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
                      <DropdownToggle nav >
                        Activities
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem href="http://www.drawchange.org/usprograms">US Program</DropdownItem>
                        <DropdownItem href="http://www.drawchange.org/costarica">Costa Rica</DropdownItem>
                        <DropdownItem href="http://www.drawchange.org/ethiopia">Ethiopia</DropdownItem>
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
                </Navbar>
              </Col>
            </Row>
            </header>
          </Container>
        
      </div>
    );
  }
}

export default Header;

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


      // this.hover = this.hover.bind(this);
    // this.onMouseEnter = this.onMouseEnter.bind(this);
    // this.onMouseLeave = this.onMouseLeave.bind(this);
    // this.toggle = this.toggle.bind(this);