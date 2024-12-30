import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import { faPen, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from '../context/AuthContext';
import { authorizedApi, publicApi } from '../services/api';
import ProfileCard from '../components/ProfileCard';
import ReviewList from '../components/ReviewList';
import useScrollToTop from "../services/useScrollToTop";
import List from '../components/List';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [lists, setLists] = useState([]);
    const [renameFormVisible, setRenameFormVisible] = useState(null); // Store the listid of the list being renamed
    const [newListName, setNewListName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate()

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
        if (user) {
            fetchReviews(user.userid, currentPage, perPage);
        }
    }, [user, currentPage]);

    const fetchLists = async () => {
        try {
            const response = await authorizedApi.get(`/list/all`);
            console.log(response.data);
            setLists(response.data);
        } catch (error) {
            console.error('Failed to fetch lists', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchLists();
        }
    }, [user]);

    const NewList = async (e) => {
        e.preventDefault();
        try {
            const response = await authorizedApi.post(`/list/create`, { "list_name": "new list" }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('List added:', response.data);
            fetchLists();
        } catch (error) {
            console.error('Renaming failed', error);
        }
    };

    const Rename = async (e, listid) => {
        e.preventDefault();
        try {
            const response = await authorizedApi.put(`/list/${listid}/rename`, { "new_name": newListName }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('List renamed:', response.data);
            fetchLists();
            setRenameFormVisible(null);
            setNewListName("");
        } catch (error) {
            console.error('Renaming failed', error);
        }
    };

    const Delete = async (e, listid) => {
        e.preventDefault();
        try {
            const response = await authorizedApi.delete(`/list/delete/${listid}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('List deleted:', response.data);
            fetchLists();
        } catch (error) {
            console.error('Deleting failed', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>; // Show a loading indicator while fetching user data
    }

    if (!reviews) {
        return <div>Loading...</div>;
    }
    if (!lists) {
        return <div>Loading...</div>;
    }

    return (
        <>
        {user.username === "admin" && (<>
        <Row>
            <Col className='mx-auto d-flex justify-content-center'>
            <Button  color="primary" onClick={(e) => {e.preventDefault();navigate("/book/add")} } >
                Manage Books
            </Button>
            </Col>
            <Col className='mx-auto d-flex justify-content-center'>
            <Button  color="primary" onClick={(e) => {e.preventDefault();navigate("/author/add")} } >
                Manage Authors
            </Button>
            </Col>
            <Col className='mx-auto d-flex justify-content-center'>
            <Button  color="primary" onClick={(e) => {e.preventDefault();navigate("/genre/add")} } >
                Manage Genres
            </Button>
            </Col>
            </Row>
        </>)}
            <ProfileCard user={user} />
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="section-header align-center">
                            <h2 className="section-title">Your Lists&nbsp;&nbsp;
                            <FontAwesomeIcon
                                icon={faPlusSquare}
                                onClick={NewList}
                                style={{ cursor: 'pointer' }}
                            />
                            </h2>
                        </div>
                    </Col>
                </Row>
                {lists.map((list) => (
                    <div key={list.listid}>
                        {renameFormVisible === list.listid ? (
                            <form onSubmit={(e) => Rename(e, list.listid)} className="d-flex align-items-center">
                                <Input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={newListName}
                                    onChange={(e) => setNewListName(e.target.value)}
                                    style={{ width: 'auto', marginRight: '10px' }}
                                />
                                <Button type="submit" color="primary" size="sm">
                                    Save
                                </Button>
                                <Button color="secondary" size="sm" onClick={() => setRenameFormVisible(null)}>
                                    Cancel
                                </Button>
                            </form>
                        ) : (
                            <h3>
                                <strong>{list.list_name}</strong>&nbsp;
                                {!["currently reading", "already read", "want to read"].includes(list.list_name) && (
                                    <>
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            onClick={() => {
                                                setRenameFormVisible(list.listid);
                                                setNewListName(list.list_name);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        &nbsp;&nbsp;&nbsp;
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={(e) => Delete(e, list.listid)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </>
                                )}
                            </h3>
                        )}
                        <List listid={list.listid} />
                    </div>
                ))}
                <Row>
                    <Col md={12}>
                        <div className="section-header align-center">
                            <h2 className="section-title">Your Reviews</h2>
                        </div>
                    </Col>
                </Row>
                <ReviewList reviews={reviews} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </Container>
        </>
    );
}

export default ProfilePage;