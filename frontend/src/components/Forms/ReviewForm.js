import React, { useEffect, useState } from "react";
import { Input, InputGroupText, InputGroup, FormGroup, Form, Button, Label } from 'reactstrap';

function ReviewForm(props) {
    const oldreview = props.oldreview;
    let request = "/add";
    const [review, SetReview] = useState({
        review: "",
        rating: 0
    });

    useEffect(()=>{
        if (oldreview){
            console.log(oldreview)
            SetReview(oldreview);
            request = "/id/update"
        };
    },[oldreview])

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetReview((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

    return (
        <Form className="m-0">
        <FormGroup>
            <Label for="content">review:</Label>
            <InputGroup className="input-group-alternative mb-3">
            <Input
                className="form-control"
                name="review"
                id="review"
                placeholder="review on the book..."
                type="textarea"
                value={review.review}
                onChange={handleChange}
                style={{ height: '200px' }} // Set height using inline style
            />
            </InputGroup>
        </FormGroup>
        <FormGroup>
            <Label for="spoiler">Spoiler:</Label>
            <InputGroup className="input-group-alternative mb-3">
            <Input
                className="form-control"
                name="spoiler"
                id="spoiler"
                type="select"
                value={review.spoiler}
                onChange={handleChange}
            >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
            </Input>
            </InputGroup>
        </FormGroup>
        <Button className="my-0 btn btn-primary">
            Submit
        </Button>
        </Form>
    );
    }

    export default ReviewForm;