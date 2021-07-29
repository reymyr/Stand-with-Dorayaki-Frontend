import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


export default class NavbarComponent extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Stand with Dorayaki</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/toko">
              <Nav.Link>Toko</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dorayaki">
              <Nav.Link>Dorayaki</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/transfer">
              <Nav.Link>Transfer</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
