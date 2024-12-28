import React, { useEffect, useContext, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Row, Col, CardHeader, CardFooter, Button } from 'reactstrap';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/css/BookInfo.css'; // Import the CSS file
import { publicApi, authorizedApi } from '../services/api';
import { Link } from 'react-router-dom';
import useScrollToTop from '../services/useScrollToTop';
import Comment from '../components/Comment';
import AuthContext from '../context/AuthContext';
import CommentForm from './Forms/CommentForm';
import ReviewForm from './Forms/ReviewForm';
import ListForm from './Forms/ListForm'

const ResponsiveCard = (props) => {
    const bookid = props.bookid;
    const { user } = useContext(AuthContext);
    const [book, setBook] = useState(null);
    const [review, setReview] = useState(null);
    const [comment, setComment] = useState(null);
    const [bookComments, setbookComments] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [listIsVisible, setlistIsVisible] = useState(false);
    const [fullDescription, setFullDescription] = useState("");
    const [reviewFormVisible, setReviewFormVisible] = useState(false);
    const [commentFormVisible, setCommentFormVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    useScrollToTop();

    useEffect(() => {
        const fetchbook = async (bookid) => {
            try {
                const response = await publicApi.get(`/book/bookid/${bookid}`);
                setBook(response.data);
                setFullDescription(response.data.description);
            } catch (error) {
                console.error('Failed to fetch book', error);
            }
        };

        fetchbook(bookid);
    }, [bookid]);

    useEffect(() => {
        const fetchbookcomments = async (bookid) => {
            try {
                const response = await publicApi.get(`/comment/bookid/${bookid}/getallcomments`,{
                    params: { page: currentPage}});
                console.log(response.data)
                setbookComments(response.data[0]);
                setTotalPages(response.data[1]);
            } catch (error) {
                console.error('Failed to fetch comments', error);
            }finally{
                setLoading(false)
            }
        };

        fetchbookcomments(bookid);
    }, [bookid,currentPage]);

    useEffect(() => {
        const fetchComment = async (bookid) => {
            try {
                const response = await authorizedApi.get(`/comment/getbybookuser/${bookid}`);
                setComment(response.data);
            } catch (error) {
                console.error('Failed to fetch comment', error);
            }
        };

        if (user) {
            fetchComment(bookid);
          }
    }, [bookid,user]);

    useEffect(() => {
        const fetchReview = async (bookid) => {
            try {
                const response = await authorizedApi.get(`/review/user_review/${bookid}`);
                setReview(response.data);
            } catch (error) {
                console.error('Failed to fetch review', error);
            }
        };

        if (user) {
            fetchReview(bookid);
          }
    }, [bookid,user]);
    
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const showlists = () => {
        setlistIsVisible(!listIsVisible)
    }

    if (!book) {
        return (<h1>Loading</h1>);
    }

    if (!Array.isArray(bookComments)){
        return <h1>Loading...</h1>
    }

    if (loading){
        return <h1>Loading...</h1>
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
                                {user && (<a href="#" onClick={showlists} style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faClipboardList} />
                                </a>)}
                            </h3>
                        </CardHeader>
                        <Row className="no-gutters">
                            {listIsVisible && (<ListForm bookid={bookid} />)}
                        </Row>
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
                                    <CardText className="book-info"><span>Author:</span><Link to={`/author/${book.authorids[0]}`}> {book.authors[0]}</Link></CardText>
                                    <CardText className="book-info"><span>Format:</span> {book.format}</CardText>
                                    <CardText className="book-info"><span>Pages:</span> {book.page_numbers}</CardText>
                                    <CardText className="book-info"><span>Published on:</span> {book.pub_date}</CardText>
                                    <CardText className="book-info"><span>Goodreads rating:</span> {book.goodreads_rating} / 5.00</CardText>
                                    <CardText className="book-info"><span>Potatometer:</span> {book.potato_meter} / 5.00 ({book.reviews_number})</CardText>
                                    <CardText className="book-info">
                                        <span>Genres: </span>
                                        {book.genres.map((genre,index) => {
                                            return (<>
                                            &nbsp;
                                            <Link to={`/genre/${book.genreids[index]}/${genre}`}>{genre}</Link>
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
                                    }} className="m-0 btn btn-link">{review ? <>Edit Review</> : <>Add Review</>}</Button>
                                    <Button onClick={(e) => {
                                        e.preventDefault();
                                        setReviewFormVisible(false);
                                        setCommentFormVisible(!commentFormVisible);
                                    }} className="m-0 btn btn-link">{comment ? <>Edit Comment</> : <>Add Comment</>}</Button>
                                    </>)}
                                </CardBody>
                            </Col>
                        </Row>
                        {commentFormVisible && (
                            <CardFooter>
                                <CommentForm bookid={bookid} oldcomment={comment}/>
                            </CardFooter>
                        )}
                        {reviewFormVisible && (
                            <CardFooter>
                                <ReviewForm oldreview={review}/>
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
            {bookComments.length === 0? (<h4 className='text-center'>No Comments yet</h4>) : (<>{bookComments.map((comment)=>{return <Comment commentid={comment.commentid} />})}
            <Row className="mt-4">
                <Col className="text-center">
                    <Button
                        color="primary"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="mx-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        color="primary"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </Col>
            </Row></>)}
        </>
    );
};

export default ResponsiveCard;