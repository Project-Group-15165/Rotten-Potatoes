import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { publicApi } from '../services/api';
import { Link } from 'react-router-dom';
import '../assets/css/review.css'

const Review = (props) => {
    const reviewid = props.reviewid
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchReview = async (reviewid) => {
        try {
            const response = await publicApi.get(`/review/get/${reviewid}`);
            setReview(response.data); // Set the Review state with the fetched data
        } catch (error) {
            console.error('Failed to fetch Review', error);
        }
        };

        fetchReview(reviewid);
    }, [reviewid]);
    if(!review){
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
                        src={require(`../assets/images/avatars/${review.avatar}.png`)} 
                        className="profile-pict-img img-fluid"
                        alt=""
                        />
                    </span>
                    </Col>
                    <Col className="right">
                    <h4>
                        <strong>
                            <Link to={`/user/${review.username}`}>@{review.username}</Link>
                        </strong>
                        <span className="gig-rating text-body-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                            <path
                            fill="currentColor"
                            d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                            ></path>
                        </svg>
                        {review.rating}
                        </span>
                        <strong>
                            <Link to={`/book/${review.bookid}`}>{review.title}</Link>
                        </strong>
                    </h4>
                    <div className="review-description">
                        <p>
                        {review.review}
                        </p>
                    </div>
                    <span className="publish py-3 d-inline-block w-100">Published on {review.creation_date}</span>
                    </Col>
                </Row>
                </CardBody>
            </Card>
            </li>
        </ul>
        </Container>
  );
};

export default Review;