import { useState, useEffect } from 'react';
import { Card, CardImg } from 'reactstrap';
import { publicApi } from '../../services/api';
import { Link } from 'react-router-dom';
import './cardstyle.css';

const BookCard = (props) => {
    const bookid = props.bookid;
    const [book, setBook] = useState(null);
    const [isMobile, setIsMobile] = useState(false); // State to track if the screen is small

    useEffect(() => {
        // Fetch book data
        const fetchBook = async (bookid) => {
            try {
                const response = await publicApi.get(`/book/get/${bookid}`);
                setBook(response.data);
            } catch (error) {
                console.error('Failed to fetch Book', error);
            }
        };

        fetchBook(bookid);

        // Check screen size on mount and on window resize
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576); // Adjust the breakpoint as needed
        };

        handleResize(); // Check the initial screen size
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, [bookid]);

    if (!book) {
        return <h1>Loading...</h1>;
    }

    return (
        <Card
            className={`card ${isMobile ? 'always-show-title' : ''}`} // Add a class for mobile
        >
            <CardImg src={book.cover} alt={book.title} className="card-img" />
            <div className="card-title-container">
                <Link to={`/book/${book.bookid}`} className="card-title">
                    {book.title}
                </Link>
            </div>
        </Card>
    );
};

export default BookCard;
