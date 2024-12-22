import React from 'react';
import { Link } from 'react-router-dom';
import { CardHeader, Card, Row, Col, CardImg, CardBody, CardText } from "reactstrap";

function TableRow(props) {
    const book = props.book
    const style = {
        width : '100%',
        height : 'auto',
        aspectRatio : '2 / 3',
        objectFit : 'cover'
    }
    return (
        <Card className="mb-3 rounded-0">
            <Row className="no-gutters">
                <Col xs="auto" style={{ width: '100px' }} className='p-0 d-flex align-items-center justify-content-center'>
                    <CardImg
                        src={book.cover}
                        alt="Book cover"
                        style={style}
                    />
                </Col>
                <Col className='p-0'>
                    <CardHeader ><Link to={`/book/${book.boookid}`}>{book.title}</Link></CardHeader>
                    <CardBody className='p-1'>
                        <CardText className='m-1'>{book.authors[0]}</CardText>
                        <CardText className='m-1'>Format : {book.format} | Year : {book.year} | {book.pages} pages</CardText>
                        <CardText className='m-1'>{book.goodreads_rating} / 5.00</CardText>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    );
}

export default TableRow;