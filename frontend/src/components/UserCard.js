import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";

function UserCard(props) {
  const user = props.user;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="my-3 mx-auto" style={{ maxWidth: '18rem' }}>
      <div className="text-center mt-3">
        <img 
          src={require(`../assets/images/avatars/${user.avatar}.png`)} 
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
          <strong>Birthdate:</strong> {formatDate(user.birthdate)}
        </CardText>
      </CardBody>
    </Card>
  );
}

export default UserCard;