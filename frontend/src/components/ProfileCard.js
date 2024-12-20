import React from "react";
import { Card, CardTitle, CardBody, CardText, CardFooter, Button } from "reactstrap";
import { Link } from "react-router-dom";
import defaultImage from '../assets/images/avatars/1.png'


function ProfileCard(props) {

  const user = props.user
  let profileImage;
  try {
    profileImage = require(`../assets/images/avatars/${user.avatar}.png`);
  } catch (error) {
    profileImage = defaultImage;
  }
  return (
    <Card className="my-3 mx-auto" style={{ maxWidth: '18rem' }}>
      <div className="text-center mt-3">
        <img 
          src={profileImage} 
          className="rounded-circle border" 
          style={{ width: '6rem' }}
          alt="User"
        />
      </div>
      <CardBody className="text-center">
        <CardTitle>{user.username}</CardTitle>
        <CardText>
          <strong>Name:</strong> {user.name}
        </CardText>
        <CardText>
          <strong>Email:</strong> {user.email}
        </CardText>
        <CardText>
          <strong>Birthdate:</strong> {user.birthdate}
        </CardText>
      </CardBody>
      <CardFooter className="d-flex justify-content-center">
      <Button className="mx-2 btn btn-link"><Link to={`/profile/update`}>Update</Link></Button>
      <Button className="mx-2 btn btn-link"><Link to={`/profile/delete`}>Delete</Link></Button>
    </CardFooter>
    </Card>
  );
}

export default ProfileCard;