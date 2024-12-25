import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import { publicApi } from '../services/api';
import BookCard from './cards/Bookcard';

const GenreInfo = (props) => {
    const { genreid, name } = props;
    console.log(genreid)
    const [ids, setIds] = useState([]); // Ensure initial state is an array
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 12; // Number of cards per page
    //const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async (currentPage, perPage,genreid) => {
            try {
                const response = await publicApi.get(`/genre/genreid/${genreid}`, {
                    params: { page: currentPage, per_page: perPage },
                });
                console.log(response.data)
                setIds(response.data[0] || []); 
                setTotalPages(response.data[1] || 1);
            } catch (error) {
                console.error('Failed to fetch Books', error);
            }
        };

        fetchBooks(currentPage, perPage, genreid);
    }, [currentPage,genreid]);


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

    const components = ids.map((book) => (
        <Col key={book.bookid} lg={3} md={4} xs={12} className="my-4">
            <BookCard bookid={book.bookid} />
        </Col>
    ));

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <div className="section-header align-center">
                        <h2 className="section-title">{name}</h2>
                    </div>
                </Col>
            </Row>
            <Row>
                {components && components.length > 0 ? components : <p>No results found.</p>}
            </Row>
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
            </Row>
        </Container>
    );
};

export default GenreInfo;
