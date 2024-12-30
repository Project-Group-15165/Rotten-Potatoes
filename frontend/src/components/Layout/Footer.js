import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import potato_logo from '../../assets/images/potato-logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
  return (
    <footer id="footer">
      <Container>
        <Row>
          <Col md="6" lg={6}>
            <div className="footer-item">
              <div className="company-brand">
                <img src={potato_logo} alt="logo" className="footer-logo" />
                <p>Welcome to Rotten Potatoes, where bookworms unite to devour literature like a hungry caterpillar at an all-you-can-eat buffet! Whether you're here to find your next page-turner, share your unsolicited opinions, or just procrastinate on that novel you're supposed to be writing, we've got you covered. Join our quirky community and let's turn those book spines into a spine-tingling adventure! </p>
              </div>
            </div>
          </Col>
          <Col md="2">
            <div className="footer-menu">
              <h5>About Us</h5>
              <ul className="menu-list">
                <li className="menu-item">
                  <a href={link}>Vision</a>
                </li>
                <li className="menu-item">
                  <a href={link}>Articles</a>
                </li>
                <li className="menu-item">
                  <a href={link}>Careers</a>
                </li>
                <li className="menu-item">
                  <a href={link}>Service Terms</a>
                </li>
                <li className="menu-item">
                  <a href={link}>Donate</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md="2">
            <div className="footer-menu">
              <h5>Discover</h5>
              <ul className="menu-list">
              <Link to={"/"} >
                <li className="menu-item">
                  Home
                </li>
                </Link>
              <Link to={"/discover/books"} >
                <li className="menu-item">
                Books
                </li>
                </Link>
              <Link to={"/discover/authors"} >
                <li className="menu-item">
                  Authors
                </li>
                </Link>
              <Link to={"/discover/genres"} >
                <li className="menu-item">
                  Genres
                </li>
                </Link>
              <Link to={"/advanced-search"} >
                <li className="menu-item">
                  Advanced Search
                </li>
                </Link>
              </ul>
            </div>
          </Col>
          <Col md="2">
            <div className="footer-menu">
              <h5>Help</h5>
              <ul className="menu-list">
                <li className="menu-item">
                  <a href={link}>Help Center</a>
                </li>
                <li className="menu-item">
                  <a href={link}>Report a Problem</a>
                </li>
                <li className="menu-item">
                  <a href={link}>Suggesting Edits</a>
                </li>
                <li className="menu-item">
                  <a href={link}>Contact Us</a>
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