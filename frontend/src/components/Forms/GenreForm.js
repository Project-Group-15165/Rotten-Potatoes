import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { publicApi, authorizedApi } from '../../services/api';
import {
  Input,
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

const GenreForm = () => {
  const navigate = useNavigate();

  // State
  const [genre, setGenre] = useState({
    name: '',
  });
  const [selectedGenre, setSelectedGenre] = useState(null);

  const fetchGenres = async (inputValue) => {
    try {
      const response = await publicApi.get(`/genre/getallgenres`, {
        params: { input_word: inputValue },
      });

      console.log(response)

      const options = response.data[0].map((genre) => ({
        value: genre.genreid,
        label: genre.name,
      }));

      options.unshift({ value: 'add_new', label: 'Add New Genre' });
      return options;
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  const handleGenreSelection = async (selected) => {
    if (selected.value === 'add_new') {
      setSelectedGenre(null);
      setGenre({ name: '' });
    } else {
      try {
        const response = await authorizedApi.get(`/genre/getbyid/${selected.value}`);

        setSelectedGenre(response.data);
        setGenre(response.data);
      } catch (error) {
        console.error('Failed to fetch genre details:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenre((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = selectedGenre ? 'put' : 'post';
      const endpoint = selectedGenre
        ? `genre/update/${selectedGenre.genreid}`
        : 'genre/add';

      const response = await authorizedApi[method](endpoint, genre);
      if (response.status === 200 || response.status === 201) {
        const id = await authorizedApi['get']("genre/getallgenres", {
          params: { input_word: genre["name"], per_page: 1 },
        });
        console.log(id.data)
        navigate(`/genre/${selectedGenre ? selectedGenre.genreid : id.data[0][0]["genreid"]}/ ${id.data[0][0]["name"]}`);
      }
    } catch (error) {
      console.error('Failed to save genre:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedGenre) return;

    try {
      const response = await authorizedApi.delete(`genre/delete/${selectedGenre.genreid}`);
      if (response.status === 200 || response.status === 204) {
        navigate('/discover/genres');
      }
    } catch (error) {
      console.error('Failed to delete genre:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <div className="text-center">
              <CardHeader>{selectedGenre ? 'Edit Genre' : 'Add Genre'}</CardHeader>
            </div>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="genre">Genre:</Label>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={fetchGenres}
                    defaultOptions
                    onChange={handleGenreSelection}
                    placeholder="Search for a genre or add new..."
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="name">Name:</Label>
                  <Input
                    name="name"
                    id="name"
                    placeholder="Enter genre name..."
                    type="text"
                    value={genre.name}
                    onChange={handleChange}
                  />
                </FormGroup>

                <div className="text-center">
                  <Button color="primary" type="submit">
                    {selectedGenre ? 'Update' : 'Add'} Genre
                  </Button>
                  {selectedGenre && (
                    <Button
                      color="danger"
                      className="ms-2"
                      onClick={handleDelete}
                    >
                      Delete Genre
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

export default GenreForm;
