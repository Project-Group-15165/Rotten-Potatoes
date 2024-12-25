import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { publicApi } from '../services/api';
import { Col, Container, Row, Button } from "reactstrap";
import BookCard from "../components/cards/Bookcard";
import AuthorCard from "../components/cards/Authorcard";
import GenreCard from "../components/cards/genrecard";
import useScrollToTop from "../services/useScrollToTop";

const DiscoverPage = () => {
    const { page } = useParams();
    const [input, setInput] = useState("");
    const [ids, setIds] = useState([]); // Ensure initial state is an array
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 12; // Number of cards per page
    const navigate = useNavigate();
    useScrollToTop();

    useEffect(() => {
        let request = "";
        if (page === "books") {
            request = "/book/getallbooks";
        } else if (page === "authors") {
            request = "/author/getallauthors";
        } else if (page === "genres") {
            request = "/genre/getallgenres";
        } else {
            navigate('/NotFound');
            return;
        }

        const fetchIds = async (currentPage, perPage, input) => {
            try {
                const response = await publicApi.get(request, {
                    params: { page: currentPage, per_page: perPage, input_word: input },
                });
                console.log(response.data)
                setIds(response.data[0] || []); // Ensure response data is an array
                setTotalPages(response.data[1] || 1);
            } catch (error) {
                console.error('Failed to fetch results', error);
            }
        };

        fetchIds(currentPage, perPage, input);
    }, [page, currentPage, input, navigate]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        setCurrentPage(1);
    };

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
    
    if (!Array.isArray(ids)){
        return <h1>Loading...</h1>
    }

    let components;
    if (page === "books") {
        components = ids.map((book) => (
            <Col key={book.bookid} lg={3} md={4} xs={12} className="my-4">
                <BookCard bookid={book.bookid} />
            </Col>
        ));
    } else if (page === "authors") {
        components = ids.map((author) => (
            <Col key={author.authorid} lg={3} md={4} xs={12} className="my-4">
                <AuthorCard authorid={author.authorid} />
            </Col>
        ));
    } else if (page === "genres") {
        components = ids.map((genre) => (
            <Col key={genre.genreid} lg={3} md={4} xs={12} className="my-4">
                <GenreCard genre={genre} />
            </Col>
        ));
    }

    
    return (
        <Container>
            <Row className="justify-content-center my-4">
                <Col lg={6} md={8} sm={10} xs={12}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control rounded-pill text-center"
                            value={input}
                            onChange={handleChange}
                            style={{ padding: '10px 20px' }}
                        />
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

export default DiscoverPage;