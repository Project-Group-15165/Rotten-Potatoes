import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';
import { Container, Row, Col, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import { publicApi } from '../services/api';
import ReviewList from '../components/ReviewList';

function UserPage() {
  const { username } = useParams(); 
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5; // Number of reviews per page

  useEffect(() => {
    const fetchUser = async (username) => {
      try {
        const response = await publicApi.get(`/user/${username}`);
        setUser(response.data); // Set the user state with the fetched data
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchUser(username);
  }, [username]);

  useEffect(() => {
    const fetchReviews = async (userid, page, perPage) => {
      try {
        const response = await publicApi.get(`/review/userid/${userid}`, {
          params: { page, per_page: perPage },
        });
        setReviews(response.data[0]);
        setTotalPages(response.data[1]);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      }
    };
      if(user){
        fetchReviews(user.userid, currentPage, perPage);
      }
      
  }, [user, currentPage]);

  if (!user) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }

  if (!reviews){
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserCard user={user} />
      <Container>
        <Row>
          <Col md={12}>
            <div className="section-header align-center">
              <h2 className="section-title">Reviews by {user.username}</h2>
            </div>
          </Col>
        </Row>
        <ReviewList  reviews={reviews} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
      </Container>
    </>
  );
}

export default UserPage;