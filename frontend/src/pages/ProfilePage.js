import ProfileCard from '../components/ProfileCard';
import { Container, Row, Col, Button } from 'reactstrap';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { authorizedApi, publicApi } from '../services/api';
import ReviewList from '../components/ReviewList';
import useScrollToTop from "../services/useScrollToTop";
import List from '../components/List';

function ProfilePage() {
    const {user} = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [lists, setLists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 5; // Number of reviews per page
    useScrollToTop();

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

  useEffect(() => {
    const fetchLists = async (userid) => {
      try {
        const response = await authorizedApi.get(`/list/all`);
        console.log(response.data);
        setLists(response.data);
      } catch (error) {
        console.error('Failed to fetch lists', error);
      }
    };
      if(user){
        fetchLists(user.userid);
      }
      
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }

  if (!reviews){
    return <div>Loading...</div>;
  }
  if (!lists){
    return <div>Loading...</div>;
  }

  return (
    <>
    <ProfileCard user={user} />
        <Container>
            <Row>
                <Col md={12}>
                    <div className="section-header align-center">
                    <h2 className="section-title">Your Lists</h2>
                    </div>
                </Col>
            </Row>
            {lists.map((list)=>{return (
              <>
              <h3><strong>{list.list_name}</strong></h3>
              <List listid={list.listid}/>
              </>)})}
            <Row>
                <Col md={12}>
                    <div className="section-header align-center">
                    <h2 className="section-title">Your Reviews</h2>
                    </div>
                </Col>
            </Row>
        <ReviewList  reviews={reviews} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
      </Container>
    </>
  );
}

export default ProfilePage;