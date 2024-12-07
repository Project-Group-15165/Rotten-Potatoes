import React from 'react';
import Review from '../components/Review'
import { Col, Container } from 'reactstrap';
import { useState, useEffect } from 'react';
import { publicApi } from '../services/api';
import ReviewList from '../components/ReviewList';


function CommunityPage() {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 5; // Number of reviews per page


    useEffect(() => {
        const fetchReviews = async ( page, perPage) => {
          try {
            const response = await publicApi.get(`/review/getall`, {
              params: { page, per_page: perPage },
            });
            setReviews(response.data[0]);
            setTotalPages(response.data[1]);
          } catch (error) {
            console.error('Failed to fetch reviews', error);
          }
        };
            fetchReviews( currentPage, perPage);
          
      }, [currentPage]);
    return(
    <Container className='mx-auto'>
        <ReviewList  reviews={reviews} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
    </Container>)
}

export default CommunityPage;