import { Container, Row, Col, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import Review from '../components/Review';

function ReviewList(props) {
    const reviews = props.reviews;
    const setCurrentPage = props.setCurrentPage;
    const currentPage = props.currentPage;
    const totalPages = props.totalPages;

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

  return (
    <>
        {reviews.map((review) => (
          <Review key={review.reviewid} reviewid={review.reviewid} />
        ))}
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
    </>
  );
}

export default ReviewList;