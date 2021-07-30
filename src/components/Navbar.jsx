import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class NavbarComponent extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="ms-3">Stand with Dorayaki</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="me-auto">
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
