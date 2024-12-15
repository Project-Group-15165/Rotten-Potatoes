// BookInfo.js
import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Row, Col, CardHeader, CardFooter } from 'reactstrap';
import '../assets/css/BookInfo.css'; // Import the CSS file
import { useState } from 'react';

const ResponsiveCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const fullDescription = "It is the middle of the summer, but there is an unseasonal mist pressing against the windowpanes. Harry Potter is waiting nervously in his bedroom at the Dursleys' house in Privet Drive for a visit from Professor Dumbledore himself. One of the last times he saw the Headmaster, he was in a fierce one-to-one duel with Lord Voldemort, and Harry can't quite believe that Professor Dumbledore will actually appear at the Dursleys' of all places. Why is the Professor coming to visit him now? What is it that cannot wait until Harry returns to Hogwarts in a few weeks' time? Harry's sixth year at Hogwarts has already got off to an unusual start, as the worlds of Muggle and magic start to intertwine..."; // Your full description here
    const wordLimit = 20;

    const truncateText = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    };
    return (
        <>
        <Row className="no-gutters">
            <Col lg={8} md={10} xs={10} className='mx-auto'>
                <Card className="book-card">
                    <CardHeader className="book-header">
                        <h3 className='book-title text-center'>Harry Potter and the Half-Blood Prince</h3>
                    </CardHeader>
                    <Row className="no-gutters">
                        <Col md={4} xs={12} className='book-image-container'>
                            <CardImg
                                src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1587697303i/1.jpg"
                                alt="Book cover"
                                className="book-image"
                            />
                        </Col>
                        <Col md={5} xs={12} className='book-details'>
                            <CardBody>
                                <CardText className="book-info"><span>Author:</span> J.K Rowling</CardText>
                                <CardText className="book-info"><span>Format:</span> Paperback</CardText>
                                <CardText className="book-info"><span>Pages:</span> 652</CardText>
                                <CardText className="book-info"><span>Published on:</span> 2005-07-16</CardText>
                                <CardText className="book-info"><span>Goodreads rating:</span> 4.58</CardText>
                                <CardText className="book-info"><span>Potato rating:</span> 4.58</CardText>
                            </CardBody>
                        </Col>
                    </Row>
                    <CardFooter className="book-footer">
                        <CardTitle className="description-title">Description</CardTitle>
                        <p className="book-description">
                        {isExpanded ? fullDescription : truncateText(fullDescription, wordLimit)}
                        {fullDescription.split(' ').length > wordLimit && (
                            <span 
                            className="read-more-link"
                            onClick={() => setIsExpanded(!isExpanded)}
                            >
                            {isExpanded ? ' Read Less' : ' Read More'}
                            </span>
                        )}
                        </p>
                    </CardFooter>
                </Card>
            </Col>
        </Row>
        <div class="section-header align-center">
        <h2 class="section-title">Comments</h2>
        </div>
        </>
    );
};

export default ResponsiveCard;