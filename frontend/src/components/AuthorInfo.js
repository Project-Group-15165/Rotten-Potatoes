// AuthorInfo.js
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Row, Col, CardHeader, CardFooter, Button } from 'reactstrap';
import '../assets/css/AuthorInfo.css';

const AuthorInfo = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const fullBio = "J.K. Rowling is a British author and philanthropist. She wrote Harry Potter, which gained worldwide attention, won multiple awards, and sold more than 500 million copies, becoming the best-selling book series in history. Rowling has lived a 'rags to riches' life in which she progressed from living on benefits to being named the world's first billionaire author by Forbes. She lost her billionaire status after giving away much of her earnings to charity but remains one of the wealthiest people in the world.";
    const wordLimit = 20;

    const truncateText = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    };

    return (
        <Row className="no-gutters">
            <Col lg={8} md={10} xs={10} className='mx-auto'>
                <Card className="author-card">
                    <Row className="no-gutters">
                        <Col md={4} xs={12} className='author-image-container'>
                            <CardImg
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/330px-J._K._Rowling_2010.jpg"
                                alt="Author portrait"
                                className="author-image"
                            />
                        </Col>
                        <Col md={8} xs={12} className='author-details'>
                            <CardBody>
                                <CardText tag = {'h3'} className='author-title mb-3'>J.K. Rowling</CardText>
                                <CardText className="author-info my-auto"> British author and philanthropist (born 1965)</CardText>
                                <Button 
                                    color="primary" 
                                    className="wiki-link mt-3"
                                    onClick={() => window.open('https://en.wikipedia.org/wiki/J._K._Rowling', '_blank')}
                                >
                                    Wikipedia Page
                                </Button>
                            </CardBody>
                        </Col>
                    </Row>
                    <CardFooter className="author-footer">
                        <CardTitle className="bio-title">Biography</CardTitle>
                        <p className="author-bio">
                            {isExpanded ? fullBio : truncateText(fullBio, wordLimit)}
                            {fullBio.split(' ').length > wordLimit && (
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
    );
};

export default AuthorInfo;