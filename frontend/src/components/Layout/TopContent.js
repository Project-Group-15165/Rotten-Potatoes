import { useState , useContext} from "react";
import AuthContext from '../../context/AuthContext';

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

const TopContent = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const {user} = useContext(AuthContext);


  return (
    <div className="top-content">
      <Container fluid>
        <Row>
          <Col className="d-none d-md-block" md={4} >
            <div className="social-links">
              <ul className="list-unstyled d-flex gap-3 mb-0">
                <li>
                  <a href="#" className="text-decoration-none">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none">
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={4} sm={12}>
          <div className="d-flex justify-content-center">
                <div className="main-logo">
                    <a href="index.html"><img src="assets/images/potato-logo.png"  alt="logo"/></a>
                </div>

			</div>
          </Col>
          <Col md={4} sm={12}>
            <div className="right-element d-flex align-items-center justify-content-end gap-4">
              {
                user ? 
                <a href="#" className="user-account for-buy text-decoration-none">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                <span >Account </span>
                </a>
                : 
                <a href="#" className="user-account for-buy text-decoration-none">
                <FontAwesomeIcon icon={faSignIn} className="me-2" />
                <span >Log in</span>
              </a>
              }
              {
                user ? 
                <a href="#" className="user-account for-buy text-decoration-none">
                <FontAwesomeIcon icon={faSignOut} className="me-2" />
                <span >Logout</span>
                </a>
                : 
                <a href="#" className="user-account for-buy text-decoration-none">
                  <FontAwesomeIcon icon={faSignIn} className="me-2" />
                <span >Register</span>
              </a>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopContent;