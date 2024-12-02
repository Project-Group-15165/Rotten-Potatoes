import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer id="footer">
      <Container>
        <Row>
          <Col md="4">
            <div className="footer-item">
              <div className="company-brand">
                <img src="./assets/images/potato-logo.png" alt="logo" className="footer-logo" />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis sed ptibus liberolectus nonet psryroin. Amet sed lorem posuere sit iaculis amet, ac urna. Adipiscing fames semper erat ac in suspendisse iaculis.</p>
              </div>
            </div>
          </Col>
          <Col md="2">
            <div className="footer-menu">
              <h5>About Us</h5>
              <ul className="menu-list">
                <li className="menu-item">
                  <a href="#">Vision</a>
                </li>
                <li className="menu-item">
                  <a href="#">Articles</a>
                </li>
                <li className="menu-item">
                  <a href="#">Careers</a>
                </li>
                <li className="menu-item">
                  <a href="#">Service Terms</a>
                </li>
                <li className="menu-item">
                  <a href="#">Donate</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md="2">
            <div className="footer-menu">
              <h5>Discover</h5>
              <ul className="menu-list">
                <li className="menu-item">
                  <a href="#">Home</a>
                </li>
                <li className="menu-item">
                  <a href="#">Books</a>
                </li>
                <li className="menu-item">
                  <a href="#">Authors</a>
                </li>
                <li className="menu-item">
                  <a href="#">Subjects</a>
                </li>
                <li className="menu-item">
                  <a href="#">Advanced Search</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md="2">
            <div className="footer-menu">
              <h5>My Account</h5>
              <ul className="menu-list">
                <li className="menu-item">
                  <a href="#">Sign In</a>
                </li>
                <li className="menu-item">
                  <a href="#">View Cart</a>
                </li>
                <li className="menu-item">
                  <a href="#">My Wishlist</a>
                </li>
                <li className="menu-item">
                  <a href="#">Track My Order</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md="2">
            <div className="footer-menu">
              <h5>Help</h5>
              <ul className="menu-list">
                <li className="menu-item">
                  <a href="#">Help Center</a>
                </li>
                <li className="menu-item">
                  <a href="#">Report a Problem</a>
                </li>
                <li className="menu-item">
                  <a href="#">Suggesting Edits</a>
                </li>
                <li className="menu-item">
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;