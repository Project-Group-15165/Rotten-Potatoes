import React, { useEffect, useContext, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Row, Col, CardHeader, CardFooter, Button } from 'reactstrap';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/css/BookInfo.css'; // Import the CSS file
import { publicApi } from '../services/api';
import { Link } from 'react-router-dom';
import useScrollToTop from '../services/useScrollToTop';
import Comment from '../components/Comment';
import AuthContext from '../context/AuthContext';
import CommentForm from './Forms/CommentForm';
import ReviewForm from './Forms/ReviewForm';

const ResponsiveCard = (props) => {
    const bookid = props.bookid;
    const { user } = useContext(AuthContext);
    const [book, setBook] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [fullDescription, setFullDescription] = useState("");
    const [reviewFormVisible, setReviewFormVisible] = useState(false);
    const [commentFormVisible, setCommentFormVisible] = useState(false);
    useScrollToTop();

    useEffect(() => {
        const fetchbook = async (bookid) => {
            try {
                const response = await publicApi.get(`/book/bookid/${bookid}`);
                setBook(response.data);
                console.log(response.data)
                setFullDescription(response.data.description);
            } catch (error) {
                console.error('Failed to fetch book', error);
            }
        };

        fetchbook(bookid);
    }, [bookid]);

    if (!book) {
        return (<h1>Loading</h1>);
    }

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
                    <Card className="bookcard">
                        <CardHeader className="book-header">
                            <h3 className='book-title text-center'>{book.title} &nbsp;
                                {user && (<a href="#" style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faClipboardList} />
                                </a>)}
                            </h3>
                        </CardHeader>
                        <Row className="no-gutters">
                            <Col md={4} xs={12} className='d-flex align-items-center justify-content-center book-image-container'>
                                <CardImg
                                    src={book.cover}
                                    alt="Book cover"
                                    className="book-image"
                                />
                            </Col>
                            <Col md={5} xs={12} className='book-details'>
                                <CardBody>
                                    <CardText className="book-info"><span>Author:</span> {book.authors[0]}</CardText>
                                    <CardText className="book-info"><span>Format:</span> {book.format}</CardText>
                                    <CardText className="book-info"><span>Pages:</span> {book.page_numbers}</CardText>
                                    <CardText className="book-info"><span>Published on:</span> {book.pub_date}</CardText>
                                    <CardText className="book-info"><span>Goodreads rating:</span> {book.goodreads_rating}</CardText>
                                    <CardText className="book-info"><span>Potato rating:</span> 4.58</CardText>
                                    <CardText className="book-info">
                                        <span>Genres: </span>
                                        {book.genres.map((genre) => {
                                            return (<>
                                            &nbsp;
                                            <Link to={'/genre/1'}>{genre}</Link>
                                            &nbsp;
                                            </>)
                                        }
                                        )}
                                    </CardText>
                                    {user && (<>
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        setCommentFormVisible(false);
                                        setReviewFormVisible(!reviewFormVisible);
                                    }} className="m-0 btn btn-link">Add Review</Button>
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        setReviewFormVisible(false);
                                        setCommentFormVisible(!commentFormVisible);
                                    }} className="m-0 btn btn-link">Add Comment</Button>
                                    </>)}
                                </CardBody>
                            </Col>
                        </Row>
                        {commentFormVisible && (
                            <CardFooter>
                                <CommentForm />
                            </CardFooter>
                        )}
                        {reviewFormVisible && (
                            <CardFooter>
                                <ReviewForm oldreview={{review: "hhhh" ,rating: 0}}/>
                            </CardFooter>
                        )}
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
            <div className="section-header align-center">
                <h2 className="section-title">Comments</h2>
            </div>
            <Comment commentid={1} />
        </>
    );
};

export default ResponsiveCard;