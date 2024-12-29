import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

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
import { update } from "../services/authService";

function UpdateUser() {
  const avatars_list = [1, 2, 3, 4, 5, 6];

  const navigate = useNavigate()

  const {user} = useContext(AuthContext);

  const [userData, setUserData] = useState({...user}); 

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
      const status = await update(userData); // Await the register function
      console.log(status)
      if (status === 200) {
        console.log('update successful');
        navigate('/profile')
      } else {
        console.error('update failed');
      }
    } catch (error) {
      console.error('update failed', error);
    }
  };

  return (
    <Container className="pt-lg-7">
      <Row className="justify-content-center">
        <Col lg="5">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-white pb-5">
              <div className="text-center mb-3">
                <h1 className="display-4">Update</h1>
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
                <Row>
                                  {avatars_list.map((avatar) => (
                                    <Col lg={4} md={4} s={4} xs={4} key={avatar}>
                                      <a
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setUserData((prevData) => ({
                                            ...prevData,
                                            avatar: avatar
                                          }));
                                        }}
                                        className={`btn btn-light p-0 m-1 bg-white rounded-pill ${userData.avatar === avatar ? 'border border-primary' : ''}`}
                                      >
                                        <img src={require(`../assets/images/avatars/${avatar}.png`)} alt={`Avatar ${avatar}`} />
                                      </a>
                                    </Col>
                                  ))}
                                </Row>
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    disabled = {!getIsFormValid}
                    onClick={handleSubmit}
                  >
                    Update
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

export default UpdateUser;