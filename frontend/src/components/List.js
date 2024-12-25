import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { authorizedApi } from '../services/api';
import BookCard from '../components/cards/Bookcard';

const List = (props) => {
    const listid = props.listid;
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 4;

    useEffect(() => {
        const fetchBooks = async (listid) => {
            try {
                const response = await authorizedApi.get(`/list/${listid}/books`);
                console.log(response.data);
                setBooks(response.data);
            } catch (error) {
                console.error('Failed to fetch books', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks(listid);
    }, [listid]);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(books.length / booksPerPage)));
    };

    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

    if (loading) {
        return <h4>Loading...</h4>;
    }

    if (!Array.isArray(books) || books.length === 0) {
        return <h4>No books</h4>;
    }

    return (
        <Container>
            <Row>
                {currentBooks.map((book) => (
                    <Col key={book.bookid} lg={3} md={4} sm={6} xs={12}>
                        <BookCard bookid={book.bookid} />
                    </Col>
                ))}
            </Row>
            <Row className="mt-3">
                <Col className="text-center">
                    <Button
                        color="primary"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="mx-2">
                        {currentPage} of {Math.ceil(books.length / booksPerPage)}
                    </span>
                    <Button
                        color="primary"
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(books.length / booksPerPage)}
                    >
                        Next
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default List;