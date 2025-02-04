import {  useContext} from "react";
import AuthContext from '../../context/AuthContext';
import potato_logo from '../../assets/images/potato-logo.png'

import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faUser,
  faSignOut,
  faSignIn,
  
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const TopContent = () => {
  const {user} = useContext(AuthContext);
  const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"


  return (
    <div className="top-content">
      <Container fluid>
        <Row>
          <Col className="d-none d-md-block" md={4} >
            <div className="social-links">
              <ul className="list-unstyled d-flex gap-3 mb-0">
                <li>
                  <a href={link} className="text-decoration-none">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li>
                  <a href={link} className="text-decoration-none">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a href={link} className="text-decoration-none">
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={4} sm={12}>
          <div className="d-flex justify-content-center">
                <div className="main-logo">
                    <Link to="/"><img src={potato_logo}  alt="logo"/></Link>
                </div>

			</div>
          </Col>
          <Col md={4} sm={12}>
            <div className="right-element d-flex align-items-center justify-content-end gap-4">
              {
                user ? 
                <Link to="/profile" className="user-account for-buy text-decoration-none">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                <span >Account </span>
                </Link>
                : 
                <Link to="/login" className="user-account for-buy text-decoration-none">
                <FontAwesomeIcon icon={faSignIn} className="me-2" />
                <span >Log in</span>
              </Link>
              }
              {
                user ? 
                <Link to="/logout" className="user-account for-buy text-decoration-none">
                <FontAwesomeIcon icon={faSignOut} className="me-2" />
                <span >Logout</span>
                </Link>
                : 
                <Link to="/register" className="user-account for-buy text-decoration-none">
                  <FontAwesomeIcon icon={faSignIn} className="me-2" />
                <span >Register</span>
              </Link>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopContent;