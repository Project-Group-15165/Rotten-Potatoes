import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { publicApi, authorizedApi } from '../../services/api';
import {
  Input,
  InputGroup,
  FormGroup,
  Form,
  Button,
  Label,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const AuthorForm = () => {
  const navigate = useNavigate();

  // State
  const [author, setAuthor] = useState({
    name: '',
    wiki_link: '',
    image: '',
    summary: '',
    description: '',
    authorid: 0,
  });
  const [error, setError] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const fetchAuthors = async (inputValue) => {
    try {
      const response = await publicApi.get(`/author/getauthornameid`, {
        params: { input_word: inputValue },
      });

      console.log(response)

      const options = response.data[0].map((author) => ({
        value: author.authorid,
        label: author.name,
      }));

      options.unshift({ value: 'add_new', label: 'Add New Author' });
      return options;
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  };

  const handleAuthorSelection = async (selected) => {
    if (selected.value === 'add_new') {
      setSelectedAuthor(null);
      setAuthor({
        name: '',
        wiki_link: '',
        image: '',
        summary: '',
        description: '',
        authorid: 0,
      });
    } else {
      try {
        console.log(selected)
        const response = await authorizedApi.get(`/author/getbyid/${selected.value}`);

        setSelectedAuthor(response.data);
        setAuthor(response.data);
      } catch (error) {
        console.error('Failed to fetch author details:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = selectedAuthor ? 'put' : 'post';
      const endpoint = selectedAuthor
        ? `author/update/${selectedAuthor.authorid}`
        : 'author/add';

      const response = await authorizedApi[method](endpoint, author);
      if (response.status === 200 || response.status === 201) {
        navigate(`/author/${selectedAuthor ? selectedAuthor.authorid :response.data["authorid"]}` );
      }
    } catch (error) {
      console.error('Failed to save author:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedAuthor) return;

    try {
      const response = await authorizedApi.delete(`author/delete/${selectedAuthor.authorid}`);
      if (response.status === 200 || response.status === 204) {
        navigate('/discover/authors');
      }
    } catch (error) {
      console.error('Failed to delete author:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <div className="text-center">
              <CardHeader>{selectedAuthor ? 'Edit Author' : 'Add Author'}</CardHeader>
            </div>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="author">Author:</Label>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={fetchAuthors}
                    defaultOptions
                    onChange={handleAuthorSelection}
                    placeholder="Search for an author or add new..."
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="name">Name:</Label>
                  <Input
                    name="name"
                    id="name"
                    placeholder="Enter author name..."
                    type="text"
                    value={author.name}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="wiki_link">Wiki Link:</Label>
                  <Input
                    name="wiki_link"
                    id="wiki_link"
                    placeholder="Enter Wikipedia link..."
                    type="text"
                    value={author.wiki_link}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="image">Image URL:</Label>
                  <Input
                    name="image"
                    id="image"
                    placeholder="Enter image URL...(leave it empty if not available)"
                    type="text"
                    value={author.image}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="summary">Summary:</Label>
                  <Input
                    name="summary"
                    id="summary"
                    placeholder="Enter a short summary..."
                    type="text"
                    value={author.summary}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="description">Description:</Label>
                  <Input
                    name="description"
                    id="description"
                    type="textarea"
                    placeholder="Enter detailed description..."
                    value={author.description}
                    onChange={handleChange}
                  />
                </FormGroup>

                <div className="text-center">
                  <Button color="primary" type="submit">
                    {selectedAuthor ? 'Update' : 'Add'} Author
                  </Button>
                  {selectedAuthor && (
                    <Button
                      color="danger"
                      className="ms-2"
                      onClick={handleDelete}
                    >
                      Delete Author
                    </Button>
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthorForm;
