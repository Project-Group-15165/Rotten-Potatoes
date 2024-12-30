import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import TableRow from '../components/TableRow';
import MultiSelectComponent from '../components/MultiSelectComponent';
import Select from 'react-select';
import {  publicApi } from '../services/api';
import useScrollToTop from '../services/useScrollToTop';

function AdvancedSearch() {
    const page_options = [
        { label: "Less than 150", value: 1 },
        { label: "Between 150 and 300", value: 2 },
        { label: "Between 300 and 500", value: 3 },
        { label: "Between 500 and 700", value: 4 },
        { label: "Between 700 and 900", value: 5 },
        { label: "More than 900", value: 6 },
    ];

    const order_options = [
        { label : "Order By Title", value:1},
        { label : "Order By Author", value:2},
        { label : "Order By Format", value:4},
        { label : "Order By Rating", value:5},
        { label : "Order By Year", value:6},
        { label : "Order By Page Count", value:7},
    ]

    const formats = [
        { label: 'Webnovel', value: 'Webnovel' },
        { label: 'Mass Market Paberback', value: 'Mass Market Paberback' },
        { label: 'School & Library Binding', value: 'School & Library Binding' },
        { label: 'Audio', value: 'Audio' },
        { label: 'Novel', value: 'Novel' },
        { label: 'eBook', value: 'eBook' },
        { label: 'Paperback', value: 'Paperback' },
        { label: 'Hardcover', value: 'Hardcover' },
        { label: 'Audiobook', value: 'Audiobook' },
        { label: 'Kindle Edition', value: 'Kindle Edition' },
        { label: 'Leather Bound', value: 'Leather Bound' },
        { label: 'Graphic Novel', value: 'Graphic Novel' },
        { label: 'Board Book', value: 'Board Book' },
        { label: 'Library Binding', value: 'Library Binding' },
        { label: 'Digital', value: 'Digital' },
        { label: 'MP3 CD', value: 'MP3 CD' },
        { label: 'Box Set', value: 'Box Set' },
        { label: 'Trade Paperback', value: 'Trade Paperback' },
        { label: 'Mass Market Paperback', value: 'Mass Market Paperback' },
        { label: 'Illustrated', value: 'Illustrated' },
        { label: 'Special Edition', value: 'Special Edition' },
        { label: 'Spiral-bound', value: 'Spiral-bound' },
        { label: 'Unabridged', value: 'Unabridged' },
        { label: 'Annotated', value: 'Annotated' },
        { label: 'Bilingual', value: 'Bilingual' },
        { label: 'Collector\'s Edition', value: 'Collector\'s Edition' },
        { label: 'Enhanced Edition', value: 'Enhanced Edition' },
        { label: 'Large Print', value: 'Large Print' },
        { label: 'Miniature', value: 'Miniature' },
        { label: 'Omnibus', value: 'Omnibus' },
        { label: 'Podcast', value: 'Podcast' },
        { label: 'Revised Edition', value: 'Revised Edition' },
        { label: 'Second Edition', value: 'Second Edition' },
        { label: 'Textbook', value: 'Textbook' },
        { label: 'Workbook', value: 'Workbook' },
        { label: 'Zine', value: 'Zine' },
        { label: 'Compilation', value: 'Compilation' },
        { label: 'Journal', value: 'Journal' },
        { label: 'Magazine', value: 'Magazine' },
        { label: 'Manual', value: 'Manual' },
        { label: 'Play', value: 'Play' },
        { label: 'Screenplay', value: 'Screenplay' },
        { label: 'Short Story', value: 'Short Story' },
        { label: 'Sketchbook', value: 'Sketchbook' },
        { label: 'Yearbook', value: 'Yearbook' },
        { label: 'Memoir', value: 'Memoir' },
        { label: 'Guidebook', value: 'Guidebook' },
        { label: 'Blueprint', value: 'Blueprint' }
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

    const [input, setInput] = useState("");
    const [selectedStartYear, setSelectedStartYear] = useState(null);
    const [selectedEndYear, setSelectedEndYear] = useState(null);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPageNumbers, setSelectedPageNumbers] = useState([]);
    const [selectedMinRating, setSelectedMinRating] = useState(null);
    const [selectedMaxRating, setSelectedMaxRating] = useState(null);
    const [orderBy, setOrderBy] = useState({ label : "Order By Title", value:1})
    const [selectedFormats, setselectedFormats] = useState([])
    const [results,setResults] = useState([]) 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10;

    const handleSubmit = async () => {
        const filters = {
            selectedFormats: selectedFormats.length ? selectedFormats : null,
            orderBy: orderBy ? orderBy : null,
            input: input ? input : "",
            selectedMaxRating: selectedMaxRating ? selectedMaxRating : null,
            selectedMinRating: selectedMinRating ? selectedMinRating : null,
            selectedPageNumbers: selectedPageNumbers.length ? selectedPageNumbers : null,
            selectedGenres: selectedGenres.length ? selectedGenres : null,
            selectedAuthors: selectedAuthors.length ? selectedAuthors : null,
            selectedEndYear: selectedEndYear ? selectedEndYear : null,
            selectedStartYear: selectedStartYear ? selectedStartYear : null,
        };

        // Remove null values
        const filteredFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v != null));

        try{
            const response = await publicApi.post(`/advancedsearch?page=${currentPage}&per_page=${perPage}`, filteredFilters, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setResults(response.data["results"])
            setTotalPages(response.data["page_count"])
            console.log(response.data);
        }
        catch (error) {
            console.error('search failed', error);
        }
    }

    useEffect(()=>{
        handleSubmit()
    },[currentPage,orderBy])



    const generateYearOptions = (startYear, endYear) => {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push({ label: year.toString(), value: year });
        }
        return years;
    };

    const yearOptions = generateYearOptions(1800, new Date().getFullYear()).reverse();
    yearOptions.push({label:"Before 1800", value:0})

    const handleStartYearChange = (selectedOption) => {
        setSelectedStartYear(selectedOption);
    };

    const handleEndYearChange = (selectedOption) => {
        setSelectedEndYear(selectedOption);
    };

    const handlePageNumbersChange = (selectedOptions) => {
        setSelectedPageNumbers(selectedOptions);
    };

    const handleMinRatingChange = (selectedOption) => {
        setSelectedMinRating(selectedOption);
    };

    const handleMaxRatingChange = (selectedOption) => {
        setSelectedMaxRating(selectedOption);
    };

    const handleOrderByChange = (selectedOption) => {
        setOrderBy(selectedOption)
    }

    const handleFormatChange = (selectedOptions) => {
        setselectedFormats(selectedOptions)
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const hasInputErrors = () => {
        if (selectedStartYear && selectedEndYear && selectedStartYear.value > selectedEndYear.value) {
            return true;
        }
        if (selectedMinRating && selectedMaxRating && selectedMinRating.value >= selectedMaxRating.value) {
            return true;
        }
        return false;
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
                                    value={input}
                                    onChange={(e)=>(setInput(e.target.value))}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="m-2">
                        <Col lg={5} md={5} sm={12} xs={12} className='ms-auto'>
                            <h4>Author:</h4>
                            <MultiSelectComponent which={"author"} setSelected={setSelectedAuthors} selected={selectedAuthors}/>
                        </Col>
                        <Col lg={5} md={5} sm={12} xs={12} className='me-auto'>
                            <h4>Genre:</h4>
                            <MultiSelectComponent which={"genre"} setSelected={setSelectedGenres} selected={selectedGenres}/>
                        </Col>
                    </Row >
                    <Row className="m-2">
                        <Col lg={5} md={5} sm={12} xs={12} className='ms-auto'>
                            <h4>Format:</h4>
                            <Select
                                isMulti
                                name="format"
                                options={formats}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                onChange={handleFormatChange}
                            />
                        </Col>
                        <Col lg={5} md={5} sm={12} xs={12} className='me-auto'>
                            <h4>Page Count:</h4>
                            <Select
                                isMulti
                                name="page_numbers"
                                options={page_options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                onChange={handlePageNumbersChange}
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
                                        onChange={handleMinRatingChange}
                                        placeholder="Min"
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
                                        onChange={handleMaxRatingChange}
                                        placeholder="Max"
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
                        <Col lg={3} className='mx-auto'><Button onClick={handleSubmit} style={{ width: "100%" }} disabled={hasInputErrors()}>Search</Button></Col>
                    </Row>
                </CardBody>
            </Card>
            <Col lg={4} md={6} sm={10} xs={10} className='ms-auto'>
            <Select
                name="order_by"
                options={order_options}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customStyles}
                menuPortalTarget={document.body}
                onChange={handleOrderByChange}
            />
            </Col>
            <Col>
            
            {results.length === 0? (<h4 className='text-center'>No Comments yet</h4>) : (<>{results.map((result)=>{return <TableRow book={result} />})}
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
            </Row></>)}
            </Col>
        </Container>
    );
}

export default AdvancedSearch;