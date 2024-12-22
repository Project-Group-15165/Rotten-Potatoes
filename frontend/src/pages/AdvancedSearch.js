import { Button, Card, CardBody, CardHeader, Col, Container, Row} from 'reactstrap';
import TableRow  from '../components/TableRow';
import MultiSelectComponent from '../components/MultiSelectComponent';

function AdvancedSearch() {
    return (
        <Container>
        <CardHeader><h1 className='text-center'>Advanced Search</h1></CardHeader>
        <Card lg={8} md={10} sm={12} xs={12} className='mx-auto p-2 rounded-1'>
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
        </Container>
    )
}

export default AdvancedSearch;