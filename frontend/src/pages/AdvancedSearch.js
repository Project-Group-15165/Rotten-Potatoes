import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import TableRow from '../components/TableRow';
import MultiSelectComponent from '../components/MultiSelectComponent';
import Select from 'react-select';

function AdvancedSearch() {
    const page_options = [
        { label: "Less than 150", value: 1 },
        { label: "Between 150 and 300", value: 2 },
        { label: "Between 300 and 500", value: 3 },
        { label: "Between 500 and 700", value: 4 },
        { label: "Between 700 and 900", value: 5 },
        { label: "More than 900", value: 6 },
    ];

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        menuPortal: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
    };

    const generateYearOptions = (startYear, endYear) => {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push({ label: year.toString(), value: year });
        }
        return years;
    };

    const yearOptions = generateYearOptions(1800, new Date().getFullYear()).reverse();
    yearOptions.push({label:"Before 1800", value:0})

    const [selectedStartYear, setSelectedStartYear] = useState(null);
    const [selectedEndYear, setSelectedEndYear] = useState(null);

    const handleStartYearChange = (selectedOption) => {
        setSelectedStartYear(selectedOption);
    };

    const handleEndYearChange = (selectedOption) => {
        setSelectedEndYear(selectedOption);
    };

    return (
        <Container>
            <CardHeader><h1 className='text-center'>Advanced Search</h1></CardHeader>
            <Card className='mx-auto p-2 rounded-1'>
                <CardBody>
                    <Row className="m-2">
                        <Col lg={7} md={8} sm={10} xs={12} className='mx-auto '>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control rounded-1 text-center"
                                    placeholder="Search ..."
                                    style={{ padding: '10px 20px' }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="m-2">
                        <Col lg={5} md={5} sm={12} xs={12} className='ms-auto'>
                            <h4>Author:</h4>
                            <MultiSelectComponent which={"author"} />
                        </Col>
                        <Col lg={5} md={5} sm={12} xs={12} className='me-auto'>
                            <h4>Genre:</h4>
                            <MultiSelectComponent which={"genre"} />
                        </Col>
                    </Row >
                    <Row className="m-2">
                        <Col lg={5} md={5} sm={12} xs={12} className='ms-auto'>
                            <h4>Format:</h4>
                            <MultiSelectComponent />
                        </Col>
                        <Col lg={5} md={5} sm={12} xs={12} className='me-auto'>
                            <h4>Page number:</h4>
                            <Select
                                isMulti
                                name="page_numbers"
                                options={page_options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={customStyles}
                                menuPortalTarget={document.body}
                            />
                        </Col>
                    </Row >
                    <Row className="m-2">
                        <Col lg={5} md={5} sm={12} xs={12} className='ms-auto'>
                            <h4>Rating:</h4>
                            <Row className="m-2">
                                <Col lg={6} md={6} sm={12} xs={12} className='mx-auto my-2'>
                                    <Select
                                        name="min_rating"
                                        options={[{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 }, { label: 5, value: 5 }]}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        styles={customStyles}
                                        menuPortalTarget={document.body}
                                    />
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12} className='mx-auto my-2'>
                                    <Select
                                        name="max_rating"
                                        options={[{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 }, { label: 5, value: 5 }]}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        styles={customStyles}
                                        menuPortalTarget={document.body}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={5} md={5} sm={12} xs={12} className='me-auto'>
                            <h4>Year:</h4>
                            <Row className="m-2">
                                <Col lg={6} md={6} sm={12} xs={12} className='mx-auto my-2'>
                                    <Select
                                        name="start_year"
                                        options={yearOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        styles={customStyles}
                                        menuPortalTarget={document.body}
                                        placeholder="Start Year"
                                        value={selectedStartYear}
                                        onChange={handleStartYearChange}
                                    />
                                </Col>
                                <Col lg={6} md={6} sm={12} xs={12} className='mx-auto my-2'>
                                    <Select
                                        name="end_year"
                                        options={yearOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        styles={customStyles}
                                        menuPortalTarget={document.body}
                                        placeholder="End Year"
                                        value={selectedEndYear}
                                        onChange={handleEndYearChange}
                                    />
                                </Col>
                            </Row >
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} className='mx-auto'><Button style={{ width: "100%" }}>Search</Button></Col>
                    </Row>
                </CardBody>
            </Card>
            <Col lg={4} md={6} sm={10} xs={10} className='ms-auto'>
                <MultiSelectComponent />
            </Col>
            <Col>
                <TableRow book={{
                    "authors": [
                        "J.K. Rowling"
                    ],
                    "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546910265i/2.jpg",
                    "description": "Harry Potter is about to start his fifth year at Hogwarts School of Witchcraft and Wizardry. Unlike most schoolboys, Harry never enjoys his summer holidays, but this summer is even worse than usual. The Dursleys, of course, are making his life a misery, but even his best friends, Ron and Hermione, seem to be neglecting him.Harry has had enough. He is beginning to think he must do something, anything, to change his situation, when the summer holidays come to an end in a very dramatic fashion. What Harry is about to discover in his new year at Hogwarts will turn his world upside down...",
                    "format": "Paperback",
                    "genres": [
                        "Adventure",
                        "Audiobook",
                        "Childrens",
                        "Fiction",
                        "Magic",
                        "Middle Grade",
                        "Young Adult"
                    ],
                    "goodreads_rating": 4.5,
                    "page_numbers": 912,
                    "pub_date": "Sat, 21 Jun 2003 00:00:00 GMT",
                    "title": "Harry Potter and the Order of the Phoenix"
                }} />
                <TableRow book={{
                    "authors": [
                        "J.K. Rowling"
                    ],
                    "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546910265i/2.jpg",
                    "description": "Harry Potter is about to start his fifth year at Hogwarts School of Witchcraft and Wizardry. Unlike most schoolboys, Harry never enjoys his summer holidays, but this summer is even worse than usual. The Dursleys, of course, are making his life a misery, but even his best friends, Ron and Hermione, seem to be neglecting him.Harry has had enough. He is beginning to think he must do something, anything, to change his situation, when the summer holidays come to an end in a very dramatic fashion. What Harry is about to discover in his new year at Hogwarts will turn his world upside down...",
                    "format": "Paperback",
                    "genres": [
                        "Adventure",
                        "Audiobook",
                        "Childrens",
                        "Fiction",
                        "Magic",
                        "Middle Grade",
                        "Young Adult"
                    ],
                    "goodreads_rating": 4.5,
                    "page_numbers": 912,
                    "pub_date": "Sat, 21 Jun 2003 00:00:00 GMT",
                    "title": "Harry Potter and the Order of the Phoenix"
                }} />
                <TableRow book={{
                    "authors": [
                        "J.K. Rowling"
                    ],
                    "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546910265i/2.jpg",
                    "description": "Harry Potter is about to start his fifth year at Hogwarts School of Witchcraft and Wizardry. Unlike most schoolboys, Harry never enjoys his summer holidays, but this summer is even worse than usual. The Dursleys, of course, are making his life a misery, but even his best friends, Ron and Hermione, seem to be neglecting him.Harry has had enough. He is beginning to think he must do something, anything, to change his situation, when the summer holidays come to an end in a very dramatic fashion. What Harry is about to discover in his new year at Hogwarts will turn his world upside down...",
                    "format": "Paperback",
                    "genres": [
                        "Adventure",
                        "Audiobook",
                        "Childrens",
                        "Fiction",
                        "Magic",
                        "Middle Grade",
                        "Young Adult"
                    ],
                    "goodreads_rating": 4.5,
                    "page_numbers": 912,
                    "pub_date": "Sat, 21 Jun 2003 00:00:00 GMT",
                    "title": "Harry Potter and the Order of the Phoenix"
                }} />
                <TableRow book={{
                    "authors": [
                        "J.K. Rowling"
                    ],
                    "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546910265i/2.jpg",
                    "description": "Harry Potter is about to start his fifth year at Hogwarts School of Witchcraft and Wizardry. Unlike most schoolboys, Harry never enjoys his summer holidays, but this summer is even worse than usual. The Dursleys, of course, are making his life a misery, but even his best friends, Ron and Hermione, seem to be neglecting him.Harry has had enough. He is beginning to think he must do something, anything, to change his situation, when the summer holidays come to an end in a very dramatic fashion. What Harry is about to discover in his new year at Hogwarts will turn his world upside down...",
                    "format": "Paperback",
                    "genres": [
                        "Adventure",
                        "Audiobook",
                        "Childrens",
                        "Fiction",
                        "Magic",
                        "Middle Grade",
                        "Young Adult"
                    ],
                    "goodreads_rating": 4.5,
                    "page_numbers": 912,
                    "pub_date": "Sat, 21 Jun 2003 00:00:00 GMT",
                    "title": "Harry Potter and the Order of the Phoenix"
                }} />
            </Col>
        </Container>
    );
}

export default AdvancedSearch;