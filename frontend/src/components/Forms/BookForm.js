import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import MultiSelectComponent from '../MultiSelectComponent';
import { publicApi, authorizedApi } from '..//../services/api';
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

const BookForm = () => {
  const navigate = useNavigate();

  // State
  const [book, setBook] = useState({
    title: '',
    cover: '',
    description: '',
    format: '',
    page_numbers: 0,
    pub_date: '',
    goodreads_rating: 0,
    reviews_number: 0,
    potato_meter: 0,
    author: '',
    genres: [],
  });
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  


  const fetchBooks = async (inputValue) => {
    try {
      const response = await publicApi.get(`book/getallbooksnameid`, {
        params: { input_word: inputValue , per_page:50}, //to get all
      });
      console.log(response)

      const options = response.data[0].map((book) => ({
        value: book.bookid,
        label: book.title,
      }));

      options.unshift({ value: 'add_new', label: 'Add New Book' });
      return options;
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  const handleBookSelection = async (selected) => {
    console.log(selected)
    if (selected.value === 'add_new') {
      console.log(selected.value)
      setSelectedBook(null);
      setBook({
        title: '',
        cover: '',
        description: '',
        format: '',
        page_numbers: 0,
        pub_date: '',
        goodreads_rating: 0,
        reviews_number: 0,
        potato_meter: 0,
        author: '',
        genres: [],
      });
    } else {
      try {
        console.log(selected.label)
        const response = await authorizedApi.get(`/book/bookinfoform/${selected.value}`);
        console.log(response.data)
        setSelectedBook(response.data);
        setBook(response.data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(book.pub_date)) {
      setError('Publication date must be in YYYY-MM-DD format.');
      return;
    }
  
    if (book.goodreads_rating < 0 || book.goodreads_rating > 5) {
      setError('Goodreads rating must be between 0 and 5.');
      return;
    }
  
    setError('');
  
    try {
      const method = selectedBook ? 'put' : 'post';
      const endpoint = selectedBook
        ? `book/${selectedBook.bookid}/update`
        : 'book/add';
  
      const dataToSend = {
        ...book,
        authors: selectedAuthors,
        genres: selectedGenres,
      };

      console.log(dataToSend)
  
      const response = await authorizedApi[method](endpoint, dataToSend);
      if (response.status === 200 || response.status === 201) {
        navigate(`/book/${selectedBook ? selectedBook.bookid : response.data["bookid"]}`);
      }
    } catch (error) {
      console.error('Failed to save book:', error);
    }
  };
  

  const handleDelete = async () => {
    if (!selectedBook) return;

    try {
      const response = await authorizedApi.delete(
        `book/${selectedBook.bookid}/delete`
      );
      if (response.status === 200 || response.status === 204) {
        navigate('');
      }
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <div className="text-center">
              <CardHeader>{selectedBook ? 'Edit Book' : 'Add Book'}</CardHeader>
            </div>
            <CardBody>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="book">Book:</Label>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={fetchBooks}
                    defaultOptions
                    onChange={handleBookSelection}
                    placeholder="Search for a book or add new..."
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="title">Title:</Label>
                  <Input
                    name="title"
                    id="title"
                    placeholder="Enter book title..."
                    type="text"
                    value={book.title}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="cover">Cover URL:</Label>
                  <Input
                    name="cover"
                    id="cover"
                    placeholder="Enter cover URL..."
                    type="text"
                    value={book.cover}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="description">Description:</Label>
                  <Input
                    name="description"
                    id="description"
                    type="textarea"
                    value={book.description}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="format">Format:</Label>
                  <Input
                    name="format"
                    id="format"
                    placeholder="e.g., Hardcover, Paperback"
                    type="text"
                    value={book.format}
                    onChange={handleChange}
                  />
                </FormGroup>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="goodreads_rating">Goodreads Rating:</Label>
                      <Input
                        name="goodreads_rating"
                        id="goodreads_rating"
                        type="number"
                        step="0.1"
                        value={book.goodreads_rating}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="pub_date">Publication Date:</Label>
                      <Input
                        name="pub_date"
                        id="pub_date"
                        type="text"
                        value={book.pub_date}
                        onChange={handleChange}
                        placeholder="YYYY-MM-DD"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {!selectedBook && (
                  <Row>
                  <Col md={6}>
                    <h4>Author:</h4>
                    <MultiSelectComponent which={"author"} setSelected={setSelectedAuthors} selected={selectedAuthors} />
                  </Col>
                  <Col md={6}>
                    <h4>Genre:</h4>
                    <MultiSelectComponent which={"genre"} setSelected={setSelectedGenres} selected={selectedGenres}/>
                  </Col>
                </Row>
                
                )}
                <div className="text-center">
                  <Button color="primary" type="submit">
                    {selectedBook ? 'Update' : 'Add'} Book
                  </Button>
                  {selectedBook && (
                    <Button
                      color="danger"
                      className="ms-2"
                      onClick={handleDelete}
                    >
                      Delete Book
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

export default BookForm;
