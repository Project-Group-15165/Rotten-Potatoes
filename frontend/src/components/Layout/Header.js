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
                    <NavLink href="#home">Home</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar className="menu-item has-sub">
                    <DropdownToggle nav caret>
                      Discover
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem href="index.html">Books</DropdownItem>
                      <DropdownItem href="about.html">
                        Genres
                      </DropdownItem>
                      <DropdownItem href="styles.html">
                        Authors
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem className="menu-item">
                    <NavLink href="#featured-books">Community</NavLink>
                  </NavItem>
                  <NavItem className="menu-item">
                    <NavLink href="#popular-books">Advanced Search</NavLink>
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