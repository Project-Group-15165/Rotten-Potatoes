import React from "react";
import {login,getCurrentUser} from '../../services/authService'
import { useState , useContext} from "react";
import AuthContext from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const getIsFormValid = () => { 
    return ( 
      email && 
      password
    ); 
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access_token } = await login(email, password); // Await the login function and destructure access_token
      if (access_token) {
        localStorage.setItem('token', access_token); // Store the token in local storage
        const current_user = getCurrentUser();
        setUser(current_user);
        navigate('/profile')
      } else {
        console.error('Token is undefined');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container className="pt-lg-7">
      <Row className="justify-content-center">
        <Col lg="5">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-white pb-5">
              <div className="text-center mb-3">
                <h1 className="display-4">Log In 
                {user ? user.username : ''}</h1>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroupText>
                    <Input 
                    placeholder="Email" 
                    type="email" 
                    onChange={(e) => { 
                      setEmail(e.target.value); 
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroupText>
                    <Input
                      placeholder="Password"
                      type="password"
                      onChange={(e) => { 
                        setPassword(e.target.value); 
                        }}
                      autoComplete="off"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">
                      strong
                    </span>
                  </small>
                </div>
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    disabled={!getIsFormValid()}
                    onClick={handleSubmit}
                  >
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;