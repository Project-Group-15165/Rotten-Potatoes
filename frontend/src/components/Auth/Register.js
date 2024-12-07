import React from "react";
import {register} from '../../services/authService'
import { useState } from "react";
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
import { faUser, faUserCircle, faUserAlt, faEnvelope, faCalendarAlt, faVenusMars, faImage, faLock } from '@fortawesome/free-solid-svg-icons';

function Register() {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    username : "",
    name:"",
    middle_name:"",
    last_name:"",
    email:"",
    birthdate :"",
    gender:"",
    avatar:"",
    password:""
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleChangeint = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: parseInt(value)
    }));
  };

  const getIsFormValid = () => { 
    return ( 
      true
    ); 
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const status = await register(userData); // Await the register function
      console.log(status)
      if (status === 201) { // Check if the status code indicates success
        console.log('Registration successful');
        navigate('/login')
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };


  return (
    <Container className="pt-lg-7">
      <Row className="justify-content-center">
        <Col lg="5">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-white pb-5">
              <div className="text-center mb-3">
                <h1 className="display-4">Sign up</h1>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroupText>
                    <Input 
                    name = "username"
                    placeholder="Username" 
                    type="text" 
                    value={userData.username}
                    onChange={handleChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faUserCircle} />
                    </InputGroupText>
                    <Input 
                    name = "name"
                    placeholder="First Name"
                    type="text" 
                    value={userData.name}
                    onChange={handleChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faUserAlt} />
                    </InputGroupText>
                    <Input 
                    name = "middle_name"
                    placeholder="Middle Name" 
                    type="text" 
                    value={userData.middle_name}
                    onChange={handleChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faUserAlt} />
                    </InputGroupText>
                    <Input 
                    name="last_name"
                    placeholder="Last Name" 
                    type="text" 
                    value={userData.last_name}
                    onChange={handleChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroupText>
                    <Input 
                    name="email"
                    placeholder="Email" 
                    type="email" 
                    value={userData.email}
                    onChange={handleChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </InputGroupText>
                    <Input 
                    name = "birthdate"
                    placeholder="Birthdate" 
                    type="date" 
                    value={userData.birthdate}
                    onChange={handleChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faVenusMars} />
                    </InputGroupText>
                    <Input 
                    type="select" 
                    name="gender" 
                    id="genderSelect"
                    value={userData.gender}
                    onChange={handleChangeint}>
                      <option value="">Select Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faImage} />
                    </InputGroupText>
                    <Input 
                    type="select" 
                    name="avatar" 
                    id="avatarSelect"
                    value={userData.avatar}
                    onChange={handleChangeint}>
                      <option value="">Select a vegetable for your avatar</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroupText>
                    <Input
                      placeholder="Password"
                      name="password"
                      type="password"
                      autoComplete="off"
                      value={userData.password}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroupText>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
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
                    disabled = {!getIsFormValid}
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

export default Register;