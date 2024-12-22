import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { publicApi } from '../services/api';
import { Link } from 'react-router-dom';
import '../assets/css/review.css'

const Comment = (props) => {
    const commentid = props.commentid
    const [comment, setComment] = useState(null);

    useEffect(() => {
        const fetchComment = async (commentid) => {
        try {
            const response = await publicApi.get(`/comment/get/${commentid}`);
            setComment(response.data); // Set the Comment state with the fetched data
        } catch (error) {
            console.error('Failed to fetch Comment', error);
        }
        };

        fetchComment(commentid);
    }, [commentid]);
    if(!comment){
        return (<h1>Loading</h1>)
    }
    return (
        <Container className="review-list">
        <ul>
            <li>
            <Card className="mb-3">
                <CardBody>
                <Row className="d-flex">
                    <Col className="left" xs="auto">
                    <span>
                        <img
                        src={require(`../assets/images/avatars/${comment.avatar}.png`)} 
                        className="profile-pict-img img-fluid"
                        alt=""
                        />
                    </span>
                    </Col>
                    <Col className="right">
                    <h4>
                        <strong>
                            <Link to={`/user/${comment.username}`}>@{comment.username}</Link>
                        </strong>
                    </h4>
                    <div className="review-description">
                        <p>
                        {comment.content}
                        </p>
                    </div>
                    <span className="publish py-3 d-inline-block w-100">Published on {comment.creation_date}</span>
                    </Col>
                </Row>
                </CardBody>
            </Card>
            </li>
        </ul>
        </Container>
  );
};

export default Comment;