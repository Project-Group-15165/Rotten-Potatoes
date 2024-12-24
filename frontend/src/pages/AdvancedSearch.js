import { Button, Card, CardBody, CardHeader, Col, Container, Row} from 'reactstrap';
import TableRow  from '../components/TableRow';
import MultiSelectComponent from '../components/MultiSelectComponent';

function AdvancedSearch() {
    return (
        <Container>
        <CardHeader><h1 className='text-center'>Advanced Search</h1></CardHeader>
        <Card className='mx-auto p-2 rounded-1'>
            <CardBody>
                <Row classname="m-2">
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
                <Row classname="m-2">
                    <Col lg={5} md={5} sm={12} xs={12} className='ms-auto'>
                        <h4>Author:</h4>
                        <MultiSelectComponent />
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className='me-auto'>
                        <h4>Genre:</h4>
                        <MultiSelectComponent />
                    </Col>
                </Row >
                <Row classname="m-2">
                    <Col lg={5} md={5} sm={12} xs={12} className='ms-auto'>
                    <h4>Format:</h4>
                        <MultiSelectComponent />
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className='me-auto'>
                    <h4>Page number:</h4>
                        <MultiSelectComponent />
                    </Col>
                </Row >
                <Row classname="m-2">
                    <Col lg={5} md={5} sm={12} xs={12} className='ms-auto'>
                    <h4>Rating:</h4>
                    <Row classname="m-2">
                    <Col lg={6} md={6} sm={12} xs={12} className='mx-auto my-2'>
                        <MultiSelectComponent />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12} className='mx-auto my-2'>
                        <MultiSelectComponent />
                    </Col>
                    </Row>
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12} className='me-auto'>
                    <h4>Year:</h4>
                    <Row classname="m-2">
                    <Col lg={6} md={6} sm={12} xs={12} className='mx-auto my-2'>
                        <MultiSelectComponent />
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12} className='mx-auto my-2'>
                        <MultiSelectComponent />
                    </Col>
                    </Row >
                    </Col>
                    
                </Row>
                <Row>
                    <Col lg={3} className='mx-auto' ><Button style={{width:"100%"}}>Search</Button></Col>
                </Row>
                
            </CardBody>
        </Card>
            <Col lg={4} md={6} sm={10} xs={10} className='ms-auto'>
                <MultiSelectComponent />
            </Col>
            <Col  >
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
}}/>
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
}}/>
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
}}/>
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
}}/>
</Col>
        </Container>
    )
}

export default AdvancedSearch;