import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Application Name </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
             <LinkContainer to={'/kendogrid'}>
              <NavItem>
                <Glyphicon glyph='list-alt' /> Employee Details
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/contractor'}>
              <NavItem>
                <Glyphicon glyph='align-justify' /> Contractor Details
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/logout'}>
              <NavItem>
                <Glyphicon glyph='log-out' /> Logout
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}



// WEBPACK FOOTER //
// ./src/components/NavMenu.js