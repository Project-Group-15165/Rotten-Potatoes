import React, { useState } from 'react';
import { Button, Container, Row, Col, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { authorizedApi } from '../services/api';
import useScrollToTop from '../services/useScrollToTop'

function DeleteUser() {
    useScrollToTop()
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await authorizedApi.delete(`/user/profile/delete`,{
                headers: {
                    'Content-Type': 'application/json'
                }});
            if (response.status === 200) {
                navigate('/login'); // Redirect to login page after successful deletion
            } else {
                setErrorMessage('Failed to delete user. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Failed to delete user. Please try again.');
        }
    };

    return (
        <Container className="pt-lg-7">
            <Row className="justify-content-center">
                <Col lg="5">
                    <div className="bg-secondary shadow border-0 p-4">
                        <h2 className="text-center">Are you sure you want to delete your account?</h2>
                        {errorMessage && (
                            <Alert color="danger">
                                {errorMessage}
                            </Alert>
                        )}
                        <div className="text-center mt-4">
                            <Button color="danger" onClick={handleDelete}>
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default DeleteUser;