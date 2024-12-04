import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
  NavbarToggler,
  Collapse
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header id="header">
      <Container fluid>
        <Row>
          <Col md="12">
            <Navbar expand="md" >
            <div className="d-flex justify-content-center w-100 d-md-none"> {/* This line centers the toggler on small screens */}
              <NavbarToggler onClick={toggle} />
            </div>
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto mx-auto" navbar>
                  <NavItem className="menu-item active">
                    <NavLink tag={Link} to="/">Home</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar className="menu-item has-sub">
                    <DropdownToggle nav caret>
                      Discover
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem tag={Link} to="/discover/books">Books</DropdownItem>
                      <DropdownItem tag={Link} to="/discover/genres">Genres</DropdownItem>
                      <DropdownItem tag={Link} to="/discover/authors">Authors</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem className="menu-item">
                    <NavLink tag={Link} to="/community">Community</NavLink>
                  </NavItem>
                  <NavItem className="menu-item">
                    <NavLink tag={Link} to="/advanced-search">Advanced Search</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;