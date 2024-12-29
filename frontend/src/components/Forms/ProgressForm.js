import React, { useEffect, useState, useContext } from "react";
import { Input, Row,Col, InputGroup, FormGroup, Form, Button, Label, Card, CardBody, Progress } from 'reactstrap';
import { authorizedApi } from "../../services/api";
import AuthContext from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

function ProgressForm(props) {
    const bookid = props.bookid
    const [progress, setProgress] = useState(null);
    const { user } = useContext(AuthContext);

    const fetchprogress = async (bookid) => {
        try {
            const response = await authorizedApi.get(`/progress/bookid/${bookid}`);
            console.log(response.data)
            setProgress(response.data);

        } catch (error) {
            console.error('Failed to fetch progress', error);
        }
    };

    useEffect(() => {
        if(user){
            fetchprogress(bookid);
        }
        
    }, [bookid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProgress((prevData) => ({
          ...prevData,
          [name]: (value)
        }));
    };
    const HandleFinish = async (e) => {
        e.preventDefault();
        setProgress((prevData) => ({
          ...prevData,
          finished_reading: "NOW()"
        }));
    };

    const HandleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await authorizedApi.put(`progress/${bookid}/update`,  progress , {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Updated:', response.data);
                console.log(progress)
                fetchprogress(bookid);
            } catch (error) {
                console.error('updating failed', error);
            }
        };

    if (!progress) {
        return (<></>);
    }

    return(
        <Card className="bookcard">
            <CardBody>
                <Form className="m-0" onSubmit={HandleSubmit}>
                    <FormGroup>
                        <Label for="pages_read">Pages Read:</Label>
                        <InputGroup className="input-group-alternative mb-3">
                        <Input
                            className="form-control m-0"
                            name="pages_read"
                            id="pages_read"
                            type="number"
                            max={progress.page_numbers}
                            value={progress.pages_read}
                            onChange={handleChange}
                            style={{ width: '80px' }} // Set height using inline style
                        />
                        </InputGroup>
                    </FormGroup>
                    <Label>Progress :</Label>
                    <Progress 
                    color="info"
                    value={progress.percentage_read}>{progress.percentage_read}%</Progress>
                    <h5 className="text-center">{progress.pages_read}/{progress.page_numbers}</h5>
                    <FormGroup>
                        <Label for="notes">Thoughts :</Label>
                        <InputGroup className="input-group-alternative mb-3">
                        <Input
                            className="form-control"
                            name="notes"
                            id="notes"
                            placeholder="Thoughts so far on the book..."
                            type="textarea"
                            value={progress.notes}
                            onChange={handleChange}
                            style={{ height: '100px' }}
                        />
                        </InputGroup>
                    </FormGroup>
                    {progress.finished_reading && (<h5>Finished reading on: {progress.finished_reading}</h5>)}
                    <Row>
                    <Col className=" mx-3">
                    <Button className="mx-auto my-0 btn btn-primary">
                        Save
                    </Button>
                    </Col>
                    {!progress.finished_reading && (<Col className=" mx-3"><Button className="mx-auto my-0 btn btn-primary" onClick={HandleFinish}>
                        Finish Reading
                    </Button></Col>)}
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )

}

export default ProgressForm;