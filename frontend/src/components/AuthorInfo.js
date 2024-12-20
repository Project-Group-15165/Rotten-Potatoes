// AuthorInfo.js
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Row, Col,Container, CardHeader, CardFooter, Button } from 'reactstrap';
import '../assets/css/AuthorInfo.css';
import { publicApi} from '../services/api';
import Bookcard from '../components/cards/Bookcard'

const AuthorInfo = (props) => {
    const authorid = props.authorid;
    const [author, setAuthor]= useState(null);
    const [books, setBooks] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false);
    const [fullBio,setFullBio] = useState('')
    const wordLimit = 20;

    const replaceNullValues = (obj) => {
        const newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] === null) {
                newObj[key] = "N/A";
                } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                newObj[key] = replaceNullValues(obj[key]);
                } else {
                newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    };

    useEffect(() => {
        const fetchauthor = async (authorid) => {
            try {
                const response = await publicApi.get(`/author/authorid/${authorid}`);
                setAuthor(response.data.author); 
                setBooks(response.data.books)
                if (response.data.author.summary === null){
                    setFullBio("N/A")
                }
                else{
                    setFullBio(response.data.author.summary)
                }
            } catch (error) {
                console.error('Failed to fetch author', error);
            }
        };

        fetchauthor(authorid)
    },[authorid]);

    if(!author && !books){
        return (<h1>Loading</h1>)
    }

    const truncateText = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    };

    return (
        <Container>
        <Row className="no-gutters">
            <Col lg={8} md={10} xs={10} className='mx-auto'>
                <Card className="authorcard">
                    <Row className="no-gutters">
                        <Col md={4} xs={12} className='author-image-container'>
                            <CardImg
                                src={author.image}
                                alt="Author portrait"
                                className="author-image"
                            />
                        </Col>
                        <Col md={8} xs={12} className='author-details'>
                            <CardBody>
                                <CardText tag = {'h3'} className='author-title mb-3'>{author.name}</CardText>
                                <CardText className="author-info my-auto">{author.description}</CardText>
                                <Button 
                                    color="primary" 
                                    className="wiki-link mt-3"
                                    onClick={() => window.open(`${author.wiki_link}`, '_blank')}
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
        <Row>
            {books.map((book)=>{
                return <Bookcard bookid={book.bookid}/>
            })}
        </Row>
        </Container>
    );
};

export default AuthorInfo;